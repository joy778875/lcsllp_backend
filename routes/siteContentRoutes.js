import express from 'express';
import {
  getSiteContent,
  updateSiteContent,
} from '../controllers/siteContentController.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/site-content', getSiteContent);
router.put('/admin/site-content', protectAdmin, updateSiteContent);

export default router;
