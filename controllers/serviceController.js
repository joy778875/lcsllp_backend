import Service from '../models/Service.js';
import { isMongoDBConnected } from '../config/db.js';
import { getStore, saveStore } from '../config/storage.js';

export const getServices = async (req, res, next) => {
  try {
    if (isMongoDBConnected()) {
      const services = await Service.find({ active: true }).sort({ order: 1, createdAt: 1 });
      if (services && services.length > 0) {
        return res.json({ success: true, count: services.length, services });
      }
    }

    const store = getStore();
    const activeServices = (store.services || []).filter((s) => s.active !== false);
    return res.json({
      success: true,
      count: activeServices.length,
      services: activeServices,
    });
  } catch (error) {
    const store = getStore();
    return res.json({
      success: true,
      count: store.services?.length || 0,
      services: store.services || [],
    });
  }
};

export const getServiceBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;

    if (isMongoDBConnected()) {
      const service = await Service.findOne({ $or: [{ slug }, { _id: slug }] });
      if (service) {
        return res.json({ success: true, service });
      }
    }

    const store = getStore();
    const service = (store.services || []).find((s) => s.slug === slug || s._id === slug || s.id === slug);
    if (service) {
      return res.json({ success: true, service });
    }

    return res.status(404).json({ success: false, message: 'Service not found' });
  } catch (error) {
    next(error);
  }
};

export const getAllServicesAdmin = async (req, res, next) => {
  try {
    if (isMongoDBConnected()) {
      const services = await Service.find().sort({ order: 1, createdAt: 1 });
      if (services && services.length > 0) {
        return res.json({ success: true, count: services.length, services });
      }
    }

    const store = getStore();
    return res.json({
      success: true,
      count: store.services?.length || 0,
      services: store.services || [],
    });
  } catch (error) {
    next(error);
  }
};

export const createService = async (req, res, next) => {
  try {
    const { title, slug, featuredStatement, shortDesc, fullDesc, image, tags, iconName, order, active } = req.body;

    if (!title || !shortDesc) {
      return res.status(400).json({ success: false, message: 'Title and short description are required' });
    }

    const computedSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const newService = {
      _id: 'srv_' + Date.now().toString(),
      slug: computedSlug,
      title,
      featuredStatement: featuredStatement || '',
      shortDesc,
      fullDesc: fullDesc || '',
      image: image || '/images/service-avionics.jpg',
      tags: Array.isArray(tags) ? tags : typeof tags === 'string' ? tags.split(',').map((t) => t.trim()) : [],
      iconName: iconName || 'Cpu',
      order: order !== undefined ? Number(order) : 0,
      active: active !== undefined ? Boolean(active) : true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (isMongoDBConnected()) {
      try {
        const created = await Service.create(newService);
        newService._id = created._id;
      } catch (err) {
        console.warn('Mongo createService warning:', err.message);
      }
    }

    // Persist to local JSON store
    const store = getStore();
    if (!store.services) store.services = [];
    store.services.push(newService);
    saveStore(store);

    return res.status(201).json({
      success: true,
      message: 'Service created successfully',
      service: newService,
    });
  } catch (error) {
    next(error);
  }
};

export const updateService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (updateData.tags && typeof updateData.tags === 'string') {
      updateData.tags = updateData.tags.split(',').map((t) => t.trim());
    }

    if (isMongoDBConnected()) {
      try {
        await Service.findByIdAndUpdate(id, updateData, { new: true });
      } catch (err) {
        console.warn('Mongo updateService warning:', err.message);
      }
    }

    // Persist to local JSON store
    const store = getStore();
    const index = (store.services || []).findIndex((s) => s._id === id || s.slug === id);
    if (index !== -1) {
      store.services[index] = {
        ...store.services[index],
        ...updateData,
        updatedAt: new Date().toISOString(),
      };
      saveStore(store);
      return res.json({
        success: true,
        message: 'Service updated successfully',
        service: store.services[index],
      });
    }

    return res.status(404).json({ success: false, message: 'Service not found' });
  } catch (error) {
    next(error);
  }
};

export const deleteService = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (isMongoDBConnected()) {
      try {
        await Service.findByIdAndDelete(id);
      } catch (err) {
        console.warn('Mongo deleteService warning:', err.message);
      }
    }

    // Persist to local JSON store
    const store = getStore();
    store.services = (store.services || []).filter((s) => s._id !== id && s.slug !== id);
    saveStore(store);

    return res.json({
      success: true,
      message: 'Service deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
