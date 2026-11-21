import { useState, useEffect, useCallback } from 'react';
import initialTrackingData from '../data/tracking';
import socketService from '../services/socketService';
import telemetryService from '../services/telemetryService';

/**
 * Custom Hook: useLiveTracking
 * Combines real-time Socket.IO telemetry feeds with graceful simulated telemetry mode fallback.
 * Automatically synchronizes GPS latitude/longitude, altitude, speed, heading, and battery.
 */
export function useLiveTracking(initialDrones = initialTrackingData) {
  const [drones, setDrones] = useState(initialDrones);
  const [selectedDroneId, setSelectedDroneId] = useState(initialDrones[0]?.id || 1);
  const [lastSyncSeconds, setLastSyncSeconds] = useState(0);
  const [isSocketConnected, setIsSocketConnected] = useState(false);

  // 1. Initialize Socket.IO connection & event listeners
  useEffect(() => {
    let unsubscribeTelemetry = null;
    let unsubscribeAlert = null;

    try {
      const socket = socketService.connect();
      if (socket) {
        setIsSocketConnected(socket.connected);

        socket.on('connect', () => {
          setIsSocketConnected(true);
        });

        socket.on('disconnect', () => {
          setIsSocketConnected(false);
        });

        // Join room for active drone
        if (selectedDroneId) {
          socketService.joinDroneRoom(selectedDroneId);
        }

        // Subscribe to live telemetry broadcasts
        unsubscribeTelemetry = socketService.onTelemetryUpdate((incoming) => {
          setDrones((prevDrones) =>
            prevDrones.map((d) => {
              const match =
                String(d.id) === String(incoming.droneId) ||
                d.bookingId === incoming.bookingId ||
                d._id === incoming.droneId;

              if (!match) return d;

              const newBattery = incoming.batteryLevel ?? incoming.battery ?? d.battery;
              const newSpeed = incoming.speed ?? d.speed;
              const newAltitude = incoming.altitude ?? d.altitude;
              const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

              const updatedBatteryHist = [...(d.batteryHistory || [])];
              if (updatedBatteryHist.length > 8) updatedBatteryHist.shift();
              updatedBatteryHist.push({ time: nowStr, battery: newBattery });

              const updatedSpeedHist = [...(d.speedHistory || [])];
              if (updatedSpeedHist.length > 8) updatedSpeedHist.shift();
              updatedSpeedHist.push({ time: nowStr, speed: newSpeed });

              return {
                ...d,
                battery: newBattery,
                speed: newSpeed,
                altitude: newAltitude,
                lat: incoming.latitude ?? incoming.lat ?? d.lat,
                lng: incoming.longitude ?? incoming.lng ?? d.lng,
                heading: incoming.heading ?? d.heading,
                telemetrySource: incoming.telemetrySource || 'simulated',
                isSimulated: incoming.isSimulated !== false,
                lastUpdated: 'Just now',
                batteryHistory: updatedBatteryHist,
                speedHistory: updatedSpeedHist
              };
            })
          );
          setLastSyncSeconds(0);
        });
      }
    } catch (err) {
      console.warn('Socket connection fallback active:', err.message);
    }

    return () => {
      if (unsubscribeTelemetry) unsubscribeTelemetry();
      if (unsubscribeAlert) unsubscribeAlert();
      if (selectedDroneId) {
        socketService.leaveDroneRoom(selectedDroneId);
      }
    };
  }, [selectedDroneId]);

  // 2. Simulated Interval Telemetry Engine (Controlled development mode)
  useEffect(() => {
    const telemetryInterval = setInterval(() => {
      setDrones((prevDrones) =>
        prevDrones.map((drone) => {
          if (drone.status === 'offline' || drone.status === 'returned') {
            return drone;
          }

          // Simulate small fluctuations
          const newBattery = Math.max(10, drone.battery - (Math.random() > 0.7 ? 1 : 0));
          const speedDelta = Math.floor(Math.random() * 5) - 2;
          const newSpeed = Math.max(15, Math.min(55, drone.speed + speedDelta));
          const altDelta = Math.floor(Math.random() * 5) - 2;
          const newAltitude = Math.max(20, Math.min(150, drone.altitude + altDelta));

          // Coordinate movement drift (circular trajectory)
          const angle = (Date.now() / 10000) % (2 * Math.PI);
          const newLat = (drone.originLat || drone.lat || 12.9716) + Math.sin(angle) * 0.003;
          const newLng = (drone.originLng || drone.lng || 77.5946) + Math.cos(angle) * 0.003;
          const newHeading = Math.round(((angle * 180) / Math.PI + 360) % 360);

          // Update battery and speed history
          const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          const updatedBatteryHist = [...(drone.batteryHistory || [])];
          if (updatedBatteryHist.length > 8) updatedBatteryHist.shift();
          updatedBatteryHist.push({ time: nowStr, battery: newBattery });

          const updatedSpeedHist = [...(drone.speedHistory || [])];
          if (updatedSpeedHist.length > 8) updatedSpeedHist.shift();
          updatedSpeedHist.push({ time: nowStr, speed: newSpeed });

          return {
            ...drone,
            battery: newBattery,
            speed: newSpeed,
            altitude: newAltitude,
            lat: Number(newLat.toFixed(6)),
            lng: Number(newLng.toFixed(6)),
            heading: newHeading,
            telemetrySource: 'simulated',
            isSimulated: true,
            lastUpdated: 'Just now',
            batteryHistory: updatedBatteryHist,
            speedHistory: updatedSpeedHist
          };
        })
      );
      setLastSyncSeconds(0);
    }, 4000);

    // Tick last sync counter every second
    const syncCounterInterval = setInterval(() => {
      setLastSyncSeconds((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(telemetryInterval);
      clearInterval(syncCounterInterval);
    };
  }, []);

  const selectedDrone =
    drones.find((d) => d.id === selectedDroneId || d.bookingId === selectedDroneId || d._id === selectedDroneId) ||
    drones[0];

  return {
    drones,
    setDrones,
    selectedDrone,
    selectedDroneId,
    setSelectedDroneId,
    lastSyncSeconds,
    isSocketConnected
  };
}

export default useLiveTracking;
