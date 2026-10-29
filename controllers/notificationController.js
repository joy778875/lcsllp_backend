import Notification from '../models/Notification.js';
import { isMongoDBConnected } from '../config/db.js';
import { getStore, saveStore } from '../config/storage.js';

export const getActiveNotification = async (req, res, next) => {
  try {
    if (isMongoDBConnected()) {
      const now = new Date();
      const notification = await Notification.findOne({
        active: true,
        $and: [
          { $or: [{ startDate: null }, { startDate: { $lte: now } }] },
          { $or: [{ endDate: null }, { endDate: { $gte: now } }] },
        ],
      }).sort({ updatedAt: -1 });

      if (notification) {
        return res.json({ success: true, notification });
      }
    }

    const store = getStore();
    const activeNotif = (store.notifications || []).find((n) => n.active);
    return res.json({ success: true, notification: activeNotif || null });
  } catch (error) {
    const store = getStore();
    const activeNotif = (store.notifications || []).find((n) => n.active);
    res.json({ success: true, notification: activeNotif || null });
  }
};

export const getNotificationsAdmin = async (req, res, next) => {
  try {
    if (isMongoDBConnected()) {
      const notifications = await Notification.find().sort({ createdAt: -1 });
      if (notifications && notifications.length > 0) {
        return res.json({ success: true, count: notifications.length, notifications });
      }
    }

    const store = getStore();
    return res.json({
      success: true,
      count: store.notifications?.length || 0,
      notifications: store.notifications || [],
    });
  } catch (error) {
    next(error);
  }
};

export const createNotification = async (req, res, next) => {
  try {
    const { title, message, active, style } = req.body;

    if (!title || !message) {
      return res.status(400).json({ success: false, message: 'Title and message are required' });
    }

    const isActivating = active !== undefined ? Boolean(active) : true;

    if (isMongoDBConnected()) {
      try {
        if (isActivating) {
          await Notification.updateMany({}, { active: false });
        }

        const notification = await Notification.create({
          title,
          message,
          active: isActivating,
          style: style || 'festive',
        });

        const store = getStore();
        if (isActivating && store.notifications) {
          store.notifications.forEach((n) => (n.active = false));
        }
        if (!store.notifications) store.notifications = [];
        store.notifications.unshift(notification);
        saveStore(store);

        return res.status(201).json({ success: true, message: 'Notification created successfully', notification });
      } catch (err) {
        console.warn('Mongo createNotification warning:', err.message);
      }
    }

    const newNotif = {
      _id: 'notif_' + Date.now().toString(),
      title,
      message,
      active: isActivating,
      style: style || 'festive',
      createdAt: new Date().toISOString(),
    };

    const store = getStore();
    if (!store.notifications) store.notifications = [];
    if (isActivating) {
      store.notifications.forEach((n) => (n.active = false));
    }
    store.notifications.unshift(newNotif);
    saveStore(store);

    return res.status(201).json({
      success: true,
      message: 'Notification created successfully',
      notification: newNotif,
    });
  } catch (error) {
    next(error);
  }
};

export const updateNotification = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (isMongoDBConnected()) {
      try {
        if (updateData.active) {
          await Notification.updateMany({ _id: { $ne: id } }, { active: false });
        }
        await Notification.findByIdAndUpdate(id, updateData, { new: true });
      } catch (err) {
        console.warn('Mongo updateNotification warning:', err.message);
      }
    }

    const store = getStore();
    if (updateData.active && store.notifications) {
      store.notifications.forEach((n) => {
        if (n._id !== id) n.active = false;
      });
    }

    const index = (store.notifications || []).findIndex((n) => n._id === id);
    if (index !== -1) {
      store.notifications[index] = {
        ...store.notifications[index],
        ...updateData,
      };
      saveStore(store);
      return res.json({
        success: true,
        message: 'Notification updated successfully',
        notification: store.notifications[index],
      });
    }

    return res.status(404).json({ success: false, message: 'Notification not found' });
  } catch (error) {
    next(error);
  }
};

export const deleteNotification = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (isMongoDBConnected()) {
      try {
        await Notification.findByIdAndDelete(id);
      } catch (err) {
        console.warn('Mongo deleteNotification warning:', err.message);
      }
    }

    const store = getStore();
    store.notifications = (store.notifications || []).filter((n) => n._id !== id);
    saveStore(store);

    return res.json({ success: true, message: 'Notification deleted successfully' });
  } catch (error) {
    next(error);
  }
};
