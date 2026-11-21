import api from './api';

export const telemetryService = {
  /**
   * Get latest telemetry snapshot for a drone
   */
  async getLatestTelemetry(droneId) {
    const res = await api.get(`/telemetry/${droneId}/latest`);
    return res.data?.telemetry || res.telemetry || res;
  },

  /**
   * Get historical telemetry recordings for a drone
   */
  async getTelemetryHistory(droneId, limit = 50) {
    const res = await api.get(`/telemetry/${droneId}?limit=${limit}`);
    return res.data?.telemetry || res.telemetry || res;
  },

  /**
   * Ingest telemetry reading (simulated or real)
   */
  async recordTelemetry(data) {
    const res = await api.post('/telemetry', data);
    return res.data || res;
  },

  /**
   * Step simulator one tick forward
   */
  async triggerSimulatorTick(droneId) {
    const res = await api.post('/telemetry/simulator/tick', { droneId });
    return res.data || res;
  },

  /**
   * Start or stop background simulator stream
   */
  async toggleSimulator(action = 'start') {
    const res = await api.post('/telemetry/simulator/toggle', { action });
    return res.data || res;
  }
};

export default telemetryService;

