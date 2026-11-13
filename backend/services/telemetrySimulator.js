import Telemetry from '../models/Telemetry.js';
import Drone from '../models/Drone.js';
import Alert from '../models/Alert.js';
import { getIO } from '../config/socket.js';

/**
 * TELEMETRY ARCHITECTURE & ADAPTER CONTRACT
 * 
 * Future real hardware implementations (e.g. MAVLink / DJI Cloud API / PX4)
 * can implement this exact interface to seamlessly replace the simulator.
 */
export class ITelemetryAdapter {
  async processTelemetry(droneId, rawReading) {
    throw new Error('processTelemetry must be implemented by adapter');
  }
}

/**
 * SIMULATED TELEMETRY ADAPTER
 * Produces synthetic GPS, altitude, speed, and battery telemetry for development & UI testing.
 * All records are strictly tagged with telemetrySource: 'simulated'.
 */
class TelemetrySimulatorService extends ITelemetryAdapter {
  constructor() {
    super();
    this.intervalId = null;
    this.isRunning = false;
    this.simulatedDrones = new Map(); // droneId -> state
  }

  /**
   * Register a drone for telemetry simulation
   */
  registerDrone(droneId, options = {}) {
    const initialState = {
      droneId: droneId.toString(),
      droneName: options.droneName || 'Simulated Drone',
      bookingId: options.bookingId || `DRN-${droneId.toString().slice(-4)}`,
      shopId: options.shopId || 'shop-1',
      latitude: options.latitude || 12.9716 + (Math.random() - 0.5) * 0.05,
      longitude: options.longitude || 77.5946 + (Math.random() - 0.5) * 0.05,
      originLat: options.latitude || 12.9716,
      originLng: options.longitude || 77.5946,
      altitude: options.altitude || 45,
      speed: options.speed || 32,
      heading: options.heading || 90,
      battery: options.battery || 88,
      status: options.status || 'in-flight',
      geofenceRadiusMeters: options.geofenceRadiusMeters || 3000,
      telemetrySource: 'simulated'
    };
    this.simulatedDrones.set(droneId.toString(), initialState);
    return initialState;
  }

  /**
   * Generate next simulated telemetry snapshot
   */
  stepSimulation(droneId) {
    let state = this.simulatedDrones.get(droneId.toString());
    if (!state) {
      state = this.registerDrone(droneId);
    }

    // Flight dynamics simulation (circular drift)
    const angleDelta = 0.05;
    const currentAngle = (state.heading * Math.PI) / 180 + angleDelta;
    state.heading = Math.round((currentAngle * 180) / Math.PI) % 360;

    // Small coordinate increment
    const stepSize = 0.0003;
    state.latitude += Math.sin(currentAngle) * stepSize;
    state.longitude += Math.cos(currentAngle) * stepSize;

    // Small fluctuations
    state.speed = Math.max(10, Math.min(65, Math.round(state.speed + (Math.random() * 4 - 2))));
    state.altitude = Math.max(15, Math.min(120, Math.round(state.altitude + (Math.random() * 4 - 2))));

    // Battery gradual decay
    if (Math.random() > 0.4) {
      state.battery = Math.max(5, state.battery - 1);
    }

    return {
      droneId: state.droneId,
      droneName: state.droneName,
      bookingId: state.bookingId,
      shopId: state.shopId,
      batteryLevel: state.battery,
      battery: state.battery,
      latitude: Number(state.latitude.toFixed(6)),
      longitude: Number(state.longitude.toFixed(6)),
      lat: Number(state.latitude.toFixed(6)),
      lng: Number(state.longitude.toFixed(6)),
      altitude: state.altitude,
      speed: state.speed,
      heading: state.heading,
      status: state.status,
      satellites: 15,
      signalStrength: 96,
      telemetrySource: 'simulated',
      isSimulated: true,
      recordedAt: new Date().toISOString()
    };
  }

  /**
   * Broadcast telemetry data over Socket.IO and persist to MongoDB
   */
  async ingestAndBroadcast(telemetryData, userId = null) {
    const io = getIO();

    // 1. Emit live telemetry event to interested rooms immediately for low latency
    if (io) {
      io.to(`drone:${telemetryData.droneId}`).emit('telemetry_update', telemetryData);
      if (telemetryData.shopId) {
        io.to(`shop:${telemetryData.shopId}`).emit('telemetry_update', telemetryData);
      }
      io.to('admin:all').emit('telemetry_update', telemetryData);
    }

    // 2. Persist to MongoDB Telemetry collection asynchronously
    try {
      if (telemetryData.droneId && telemetryData.droneId.length === 24) {
        await Telemetry.create({
          droneId: telemetryData.droneId,
          batteryLevel: telemetryData.batteryLevel || telemetryData.battery,
          latitude: telemetryData.latitude || telemetryData.lat,
          longitude: telemetryData.longitude || telemetryData.lng,
          altitude: telemetryData.altitude,
          speed: telemetryData.speed,
          heading: telemetryData.heading,
          telemetrySource: telemetryData.telemetrySource || 'simulated',
          recordedAt: new Date()
        });

        // Sync drone battery in Drone collection
        await Drone.findByIdAndUpdate(telemetryData.droneId, {
          batteryLevel: telemetryData.batteryLevel || telemetryData.battery
        });
      }
    } catch (err) {
      // Quiet fail on persistence error during rapid streaming
    }

    // 3. Automated Safety Alert Threshold Checks
    if ((telemetryData.batteryLevel || telemetryData.battery) < 20) {
      this.triggerSimulatedAlert(telemetryData.droneId, {
        alertType: 'low battery',
        message: `[SIMULATED TELEMETRY] Drone battery is critically low at ${telemetryData.batteryLevel || telemetryData.battery}%. Return to home recommended.`,
        severity: 'high',
        userId
      });
    }

    return telemetryData;
  }

  /**
   * Trigger an Alert event and persist in MongoDB
   */
  async triggerSimulatedAlert(droneId, alertData) {
    const io = getIO();
    const alertPayload = {
      droneId: droneId.toString(),
      alertType: alertData.alertType || 'system',
      message: alertData.message || 'System notification',
      severity: alertData.severity || 'medium',
      location: alertData.location || { latitude: 12.9716, longitude: 77.5946, altitude: 45 },
      isSimulated: true,
      createdAt: new Date().toISOString()
    };

    if (io) {
      io.to(`drone:${droneId}`).emit('alert_trigger', alertPayload);
      io.to(`drone:${droneId}`).emit('new_alert', alertPayload);
      io.to('admin:all').emit('new_alert', alertPayload);
    }

    try {
      if (droneId && droneId.length === 24 && alertData.userId) {
        await Alert.create({
          droneId,
          userId: alertData.userId,
          alertType: alertData.alertType,
          message: alertData.message,
          severity: alertData.severity,
          location: alertData.location
        });
      }
    } catch (e) {
      // Alert save handled gracefully
    }

    return alertPayload;
  }

  /**
   * Start automated background ticks every 4 seconds
   */
  start(intervalMs = 4000) {
    if (this.isRunning) return;
    this.isRunning = true;

    this.intervalId = setInterval(async () => {
      for (const [droneId] of this.simulatedDrones.entries()) {
        const nextTelemetry = this.stepSimulation(droneId);
        await this.ingestAndBroadcast(nextTelemetry);
      }
    }, intervalMs);

    console.log(`📡 Telemetry Simulator stream active (Tick rate: ${intervalMs}ms)`);
  }

  /**
   * Stop automated background ticks
   */
  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isRunning = false;
    console.log('⏹️  Telemetry Simulator stream stopped');
  }
}

export const telemetrySimulator = new TelemetrySimulatorService();
export default telemetrySimulator;

