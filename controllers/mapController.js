import MapLocation from '../models/MapLocation.js';
import { isMongoDBConnected } from '../config/db.js';
import { getStore, saveStore } from '../config/storage.js';

export const getMapLocations = async (req, res, next) => {
  try {
    if (isMongoDBConnected()) {
      const locations = await MapLocation.find().sort({ isPrimary: -1, createdAt: 1 });
      if (locations && locations.length > 0) {
        return res.json({ success: true, count: locations.length, locations });
      }
    }

    const store = getStore();
    return res.json({
      success: true,
      count: store.maps?.length || 0,
      locations: store.maps || [],
    });
  } catch (error) {
    const store = getStore();
    res.json({
      success: true,
      count: store.maps?.length || 0,
      locations: store.maps || [],
    });
  }
};

export const createMapLocation = async (req, res, next) => {
  try {
    const { label, address, latitude, longitude, embedUrl, isPrimary } = req.body;
    if (!label || !address) {
      return res.status(400).json({ success: false, message: 'Label and address are required' });
    }

    const newLoc = {
      _id: 'map_' + Date.now().toString(),
      label,
      address,
      latitude: latitude ? Number(latitude) : 28.5961,
      longitude: longitude ? Number(longitude) : 77.3888,
      embedUrl: embedUrl || '',
      isPrimary: Boolean(isPrimary),
      createdAt: new Date().toISOString(),
    };

    if (isMongoDBConnected()) {
      try {
        const created = await MapLocation.create(newLoc);
        newLoc._id = created._id;
      } catch (err) {
        console.warn('Mongo createMapLocation warning:', err.message);
      }
    }

    const store = getStore();
    if (!store.maps) store.maps = [];
    store.maps.push(newLoc);
    saveStore(store);

    return res.status(201).json({ success: true, message: 'Map location added successfully', location: newLoc });
  } catch (error) {
    next(error);
  }
};

export const updateMapLocation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (isMongoDBConnected()) {
      try {
        await MapLocation.findByIdAndUpdate(id, updateData, { new: true });
      } catch (err) {
        console.warn('Mongo updateMapLocation warning:', err.message);
      }
    }

    const store = getStore();
    const index = (store.maps || []).findIndex((m) => m._id === id);
    if (index !== -1) {
      store.maps[index] = {
        ...store.maps[index],
        ...updateData,
      };
      saveStore(store);
      return res.json({ success: true, message: 'Location updated successfully', location: store.maps[index] });
    }

    return res.status(404).json({ success: false, message: 'Map location not found' });
  } catch (error) {
    next(error);
  }
};

export const deleteMapLocation = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (isMongoDBConnected()) {
      try {
        await MapLocation.findByIdAndDelete(id);
      } catch (err) {
        console.warn('Mongo deleteMapLocation warning:', err.message);
      }
    }

    const store = getStore();
    store.maps = (store.maps || []).filter((m) => m._id !== id);
    saveStore(store);

    return res.json({ success: true, message: 'Location deleted successfully' });
  } catch (error) {
    next(error);
  }
};
