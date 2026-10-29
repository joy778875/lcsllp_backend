import express from 'express';
import {
  getServices,
  getServiceBySlug,
  getAllServicesAdmin,
  createService,
  updateService,
  deleteService,
} from '../controllers/serviceController.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public Routes
router.get('/services', getServices);
router.get('/services/:slug', getServiceBySlug);

// Admin Protected Routes
router.get('/admin/services', protectAdmin, getAllServicesAdmin);
router.post('/admin/services', protectAdmin, createService);
router.put('/admin/services/:id', protectAdmin, updateService);
router.delete('/admin/services/:id', protectAdmin, deleteService);

export default router;
