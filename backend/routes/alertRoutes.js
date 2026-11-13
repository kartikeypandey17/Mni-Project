import express from 'express';
import {
  createAlert,
  getAlerts,
  markAlertAsRead
} from '../controllers/alertController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect); // All alert operations require authenticated user

router.post('/', createAlert);
router.get('/', getAlerts);
router.patch('/:id/read', markAlertAsRead);

export default router;

