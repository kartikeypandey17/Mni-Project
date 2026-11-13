import api from './api';

export const flightService = {
  /**
   * Get flight history records (scoped by authenticated user role)
   */
  async getFlights(params = {}) {
    const query = new URLSearchParams();
    if (params.droneId) query.append('droneId', params.droneId);
    if (params.bookingId) query.append('bookingId', params.bookingId);
    if (params.status && params.status !== 'All') query.append('status', params.status);
    if (params.page) query.append('page', params.page);
    if (params.limit) query.append('limit', params.limit);

    const queryString = query.toString() ? `?${query.toString()}` : '';
    const res = await api.get(`/flights${queryString}`);
    return res.data || res;
  },

  /**
   * Get single flight record details
   */
  async getFlightById(id) {
    const res = await api.get(`/flights/${id}`);
    return res.data?.flight || res.flight || res;
  },

  /**
   * Start a new flight record
   */
  async createFlight(data) {
    const res = await api.post('/flights', data);
    return res.data || res;
  }
};

export default flightService;

