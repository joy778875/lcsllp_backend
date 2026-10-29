import express from 'express';
import {
  getBanners,
  getAllBannersAdmin,
  createBanner,
  updateBanner,
  deleteBanner,
  reorderBanners,
} from '../controllers/bannerController.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/banners', getBanners);

// Admin Routes
router.get('/admin/banners', protectAdmin, getAllBannersAdmin);
router.post('/admin/banners', protectAdmin, createBanner);
router.put('/admin/banners/:id', protectAdmin, updateBanner);
router.delete('/admin/banners/:id', protectAdmin, deleteBanner);
router.patch('/admin/banners/reorder', protectAdmin, reorderBanners);

export default router;
