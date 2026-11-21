import api from './api';

export const alertService = {
  /**
   * Get alerts history (scoped by user role)
   */
  async getAlerts(params = {}) {
    const query = new URLSearchParams();
    if (params.droneId) query.append('droneId', params.droneId);
    if (params.alertType && params.alertType !== 'All') query.append('alertType', params.alertType);
    if (params.isRead !== undefined) query.append('isRead', params.isRead);
    if (params.page) query.append('page', params.page);
    if (params.limit) query.append('limit', params.limit);

    const queryString = query.toString() ? `?${query.toString()}` : '';
    const res = await api.get(`/alerts${queryString}`);
    return res.data || res;
  },

  /**
   * Raise / trigger a new tracking alert
   */
  async createAlert(data) {
    const res = await api.post('/alerts', data);
    return res.data || res;
  },

  /**
   * Mark alert as read / acknowledged
   */
  async markAlertAsRead(id) {
    const res = await api.patch(`/alerts/${id}/read`);
    return res.data || res;
  }
};

export default alertService;

