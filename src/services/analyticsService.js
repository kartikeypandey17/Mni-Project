import api from './api';

export const analyticsService = {
  /**
   * Fetch role-scoped dashboard analytics directly from MongoDB
   */
  async getDashboardAnalytics() {
    const res = await api.get('/analytics');
    return res.data || res;
  }
};

export default analyticsService;

