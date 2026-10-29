import express from 'express';
import {
  getMapLocations,
  createMapLocation,
  updateMapLocation,
  deleteMapLocation,
} from '../controllers/mapController.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/maps', getMapLocations);

// Admin Routes
router.post('/admin/maps', protectAdmin, createMapLocation);
router.put('/admin/maps/:id', protectAdmin, updateMapLocation);
router.delete('/admin/maps/:id', protectAdmin, deleteMapLocation);

export default router;
