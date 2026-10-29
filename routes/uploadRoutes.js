import express from 'express';
import { uploadImage } from '../controllers/uploadController.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

router.post('/admin/upload', protectAdmin, uploadImage);

export default router;
