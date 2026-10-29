import express from 'express';
import {
  getActiveNotification,
  getNotificationsAdmin,
  createNotification,
  updateNotification,
  deleteNotification,
} from '../controllers/notificationController.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/notifications/active', getActiveNotification);

// Admin Routes
router.get('/admin/notifications', protectAdmin, getNotificationsAdmin);
router.post('/admin/notifications', protectAdmin, createNotification);
router.put('/admin/notifications/:id', protectAdmin, updateNotification);
router.delete('/admin/notifications/:id', protectAdmin, deleteNotification);

export default router;
