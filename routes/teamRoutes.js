import express from 'express';
import {
  getTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from '../controllers/teamController.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/team', getTeamMembers);

// Admin Routes
router.post('/admin/team', protectAdmin, createTeamMember);
router.put('/admin/team/:id', protectAdmin, updateTeamMember);
router.delete('/admin/team/:id', protectAdmin, deleteTeamMember);

export default router;
