import Blog from '../models/Blog.js';
import { isMongoDBConnected } from '../config/db.js';
import { getStore, saveStore } from '../config/storage.js';

export const getBlogs = async (req, res, next) => {
  try {
    if (isMongoDBConnected()) {
      const blogs = await Blog.find({ active: true }).sort({ order: 1, createdAt: -1 });
      if (blogs && blogs.length > 0) {
        return res.json({ success: true, count: blogs.length, blogs });
      }
    }

    const store = getStore();
    const activeBlogs = (store.blogs || []).filter((b) => b.active !== false);
    return res.json({
      success: true,
      count: activeBlogs.length,
      blogs: activeBlogs,
    });
  } catch (error) {
    const store = getStore();
    return res.json({
      success: true,
      count: store.blogs?.length || 0,
      blogs: store.blogs || [],
    });
  }
};

export const getBlogBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;

    if (isMongoDBConnected()) {
      const blog = await Blog.findOne({ $or: [{ slug }, { _id: slug }] });
      if (blog) {
        return res.json({ success: true, blog });
      }
    }

    const store = getStore();
    const blog = (store.blogs || []).find((b) => b.slug === slug || b._id === slug);
    if (blog) {
      return res.json({ success: true, blog });
    }

    return res.status(404).json({ success: false, message: 'Article not found' });
  } catch (error) {
    next(error);
  }
};

export const getAllBlogsAdmin = async (req, res, next) => {
  try {
    if (isMongoDBConnected()) {
      const blogs = await Blog.find().sort({ order: 1, createdAt: -1 });
      if (blogs && blogs.length > 0) {
        return res.json({ success: true, count: blogs.length, blogs });
      }
    }

    const store = getStore();
    return res.json({
      success: true,
      count: store.blogs?.length || 0,
      blogs: store.blogs || [],
    });
  } catch (error) {
    next(error);
  }
};

export const createBlog = async (req, res, next) => {
  try {
    const { title, slug, category, author, date, readTime, summary, content, image, tags, active, order } = req.body;

    if (!title || !summary || !content) {
      return res.status(400).json({ success: false, message: 'Title, summary, and content are required' });
    }

    const computedSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const newBlog = {
      _id: 'blog_' + Date.now().toString(),
      slug: computedSlug,
      title,
      category: category || 'Defence Policy',
      author: author || 'Labradorite Strategic Advisory',
      date: date || new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      readTime: readTime || '5 min read',
      summary,
      content,
      image: image || '/images/iaf-fighter-jets-hero.jpg',
      tags: Array.isArray(tags) ? tags : typeof tags === 'string' ? tags.split(',').map((t) => t.trim()) : [],
      active: active !== undefined ? Boolean(active) : true,
      order: order !== undefined ? Number(order) : 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (isMongoDBConnected()) {
      try {
        const created = await Blog.create(newBlog);
        newBlog._id = created._id;
      } catch (err) {
        console.warn('Mongo createBlog warning:', err.message);
      }
    }

    // Persist to local JSON store
    const store = getStore();
    if (!store.blogs) store.blogs = [];
    store.blogs.unshift(newBlog);
    saveStore(store);

    return res.status(201).json({
      success: true,
      message: 'Article published successfully',
      blog: newBlog,
    });
  } catch (error) {
    next(error);
  }
};

export const updateBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (updateData.tags && typeof updateData.tags === 'string') {
      updateData.tags = updateData.tags.split(',').map((t) => t.trim());
    }

    if (isMongoDBConnected()) {
      try {
        await Blog.findByIdAndUpdate(id, updateData, { new: true });
      } catch (err) {
        console.warn('Mongo updateBlog warning:', err.message);
      }
    }

    // Persist to local JSON store
    const store = getStore();
    const index = (store.blogs || []).findIndex((b) => b._id === id || b.slug === id);
    if (index !== -1) {
      store.blogs[index] = {
        ...store.blogs[index],
        ...updateData,
        updatedAt: new Date().toISOString(),
      };
      saveStore(store);
      return res.json({
        success: true,
        message: 'Article updated successfully',
        blog: store.blogs[index],
      });
    }

    return res.status(404).json({ success: false, message: 'Article not found' });
  } catch (error) {
    next(error);
  }
};

export const deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (isMongoDBConnected()) {
      try {
        await Blog.findByIdAndDelete(id);
      } catch (err) {
        console.warn('Mongo deleteBlog warning:', err.message);
      }
    }

    // Persist to local JSON store
    const store = getStore();
    store.blogs = (store.blogs || []).filter((b) => b._id !== id && b.slug !== id);
    saveStore(store);

    return res.json({
      success: true,
      message: 'Article deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
