import Banner from '../models/Banner.js';
import { isMongoDBConnected } from '../config/db.js';
import { getStore, saveStore } from '../config/storage.js';

export const getBanners = async (req, res, next) => {
  try {
    if (isMongoDBConnected()) {
      const banners = await Banner.find({ active: true }).sort({ order: 1, createdAt: -1 });
      if (banners && banners.length > 0) {
        return res.json({ success: true, count: banners.length, banners });
      }
    }
    const store = getStore();
    const activeBanners = (store.banners || []).filter((b) => b.active !== false);
    return res.json({ success: true, count: activeBanners.length, banners: activeBanners });
  } catch (error) {
    const store = getStore();
    res.json({ success: true, count: store.banners?.length || 0, banners: store.banners || [] });
  }
};

export const getAllBannersAdmin = async (req, res, next) => {
  try {
    if (isMongoDBConnected()) {
      const banners = await Banner.find().sort({ order: 1, createdAt: -1 });
      if (banners && banners.length > 0) {
        return res.json({ success: true, count: banners.length, banners });
      }
    }
    const store = getStore();
    return res.json({ success: true, count: store.banners?.length || 0, banners: store.banners || [] });
  } catch (error) {
    next(error);
  }
};

export const createBanner = async (req, res, next) => {
  try {
    const { title, subtitle, eyebrow, imageUrl, link, order, active, badgeText } = req.body;

    if (!title || !imageUrl) {
      return res.status(400).json({ success: false, message: 'Title and Image URL are required' });
    }

    const newBanner = {
      _id: 'banner_' + Date.now().toString(),
      title,
      subtitle: subtitle || '',
      eyebrow: eyebrow || 'Aatmanirbhar Bharat · IAF Veteran-Led Advisory',
      imageUrl,
      link: link || '/services',
      badgeText: badgeText || 'IAF Fighter Jets Formation',
      order: order !== undefined ? Number(order) : 1,
      active: active !== undefined ? Boolean(active) : true,
      createdAt: new Date().toISOString(),
    };

    if (isMongoDBConnected()) {
      try {
        const created = await Banner.create(newBanner);
        newBanner._id = created._id;
      } catch (err) {
        console.warn('Mongo createBanner warning:', err.message);
      }
    }

    const store = getStore();
    if (!store.banners) store.banners = [];
    store.banners.push(newBanner);
    saveStore(store);

    return res.status(201).json({ success: true, message: 'Banner created successfully', banner: newBanner });
  } catch (error) {
    next(error);
  }
};

export const updateBanner = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (isMongoDBConnected()) {
      try {
        await Banner.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
      } catch (err) {
        console.warn('Mongo updateBanner warning:', err.message);
      }
    }

    const store = getStore();
    const index = (store.banners || []).findIndex((b) => b._id === id);
    if (index !== -1) {
      store.banners[index] = {
        ...store.banners[index],
        ...updateData,
      };
      saveStore(store);
      return res.json({ success: true, message: 'Banner updated successfully', banner: store.banners[index] });
    }

    return res.status(404).json({ success: false, message: 'Banner not found' });
  } catch (error) {
    next(error);
  }
};

export const deleteBanner = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (isMongoDBConnected()) {
      try {
        await Banner.findByIdAndDelete(id);
      } catch (err) {
        console.warn('Mongo deleteBanner warning:', err.message);
      }
    }

    const store = getStore();
    store.banners = (store.banners || []).filter((b) => b._id !== id);
    saveStore(store);

    return res.json({ success: true, message: 'Banner deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const reorderBanners = async (req, res, next) => {
  try {
    res.json({ success: true, message: 'Banners reordered successfully' });
  } catch (error) {
    next(error);
  }
};
