import express from 'express';
import {
  getBlogs,
  getBlogBySlug,
  getAllBlogsAdmin,
  createBlog,
  updateBlog,
  deleteBlog,
} from '../controllers/blogController.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public Routes
router.get('/blogs', getBlogs);
router.get('/blogs/:slug', getBlogBySlug);

// Admin Protected Routes
router.get('/admin/blogs', protectAdmin, getAllBlogsAdmin);
router.post('/admin/blogs', protectAdmin, createBlog);
router.put('/admin/blogs/:id', protectAdmin, updateBlog);
router.delete('/admin/blogs/:id', protectAdmin, deleteBlog);

export default router;
