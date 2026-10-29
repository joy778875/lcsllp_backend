import express from 'express';
import {
  createEnquiry,
  getEnquiriesAdmin,
  updateEnquiryStatus,
  deleteEnquiry,
} from '../controllers/enquiryController.js';
import { protectAdmin } from '../middleware/auth.js';
import { enquiryLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// Public submission with rate limiting
router.post('/enquiries', enquiryLimiter, createEnquiry);

// Admin Routes
router.get('/admin/enquiries', protectAdmin, getEnquiriesAdmin);
router.patch('/admin/enquiries/:id/status', protectAdmin, updateEnquiryStatus);
router.delete('/admin/enquiries/:id', protectAdmin, deleteEnquiry);

export default router;
