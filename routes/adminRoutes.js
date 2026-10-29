import express from 'express';
import { adminLogin, getMe } from '../controllers/adminController.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', adminLogin);
router.get('/me', protectAdmin, getMe);

export default router;
