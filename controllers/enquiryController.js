import Enquiry from '../models/Enquiry.js';
import { isMongoDBConnected } from '../config/db.js';
import { getStore, saveStore } from '../config/storage.js';

export const createEnquiry = async (req, res, next) => {
  try {
    const { name, company, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required fields.',
      });
    }

    const newEnquiry = {
      _id: 'enq_' + Date.now().toString(),
      name,
      company: company || '',
      email,
      phone: phone || '',
      subject: subject || 'General Enquiry',
      message,
      status: 'new',
      createdAt: new Date().toISOString(),
    };

    if (isMongoDBConnected()) {
      try {
        const enquiry = await Enquiry.create({
          name,
          email,
          phone: phone || '',
          subject: subject || 'General Enquiry',
          message,
          status: 'new',
        });
        newEnquiry._id = enquiry._id;

        const io = req.app.get('io');
        if (io) {
          io.emit('newEnquiry', enquiry);
        }
      } catch (err) {
        console.warn('Mongo createEnquiry warning:', err.message);
      }
    }

    const store = getStore();
    if (!store.enquiries) store.enquiries = [];
    store.enquiries.unshift(newEnquiry);
    saveStore(store);

    return res.status(201).json({
      success: true,
      message: 'Thank you for reaching out! Your opportunity enquiry has been received.',
      enquiryId: newEnquiry._id,
    });
  } catch (error) {
    next(error);
  }
};

export const getEnquiriesAdmin = async (req, res, next) => {
  try {
    if (isMongoDBConnected()) {
      const enquiries = await Enquiry.find().sort({ createdAt: -1 });
      const unreadCount = await Enquiry.countDocuments({ status: 'new' });
      if (enquiries && enquiries.length > 0) {
        return res.json({ success: true, count: enquiries.length, unreadCount, enquiries });
      }
    }

    const store = getStore();
    const enquiries = store.enquiries || [];
    const unreadCount = enquiries.filter((e) => e.status === 'new').length;

    return res.json({
      success: true,
      count: enquiries.length,
      unreadCount,
      enquiries,
    });
  } catch (error) {
    next(error);
  }
};

export const updateEnquiryStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (isMongoDBConnected()) {
      try {
        await Enquiry.findByIdAndUpdate(id, { status }, { new: true });
      } catch (err) {
        console.warn('Mongo updateEnquiryStatus warning:', err.message);
      }
    }

    const store = getStore();
    const index = (store.enquiries || []).findIndex((e) => e._id === id);
    if (index !== -1) {
      store.enquiries[index].status = status;
      saveStore(store);
      return res.json({
        success: true,
        message: `Enquiry marked as ${status}`,
        enquiry: store.enquiries[index],
      });
    }

    return res.status(404).json({ success: false, message: 'Enquiry not found' });
  } catch (error) {
    next(error);
  }
};

export const deleteEnquiry = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (isMongoDBConnected()) {
      try {
        await Enquiry.findByIdAndDelete(id);
      } catch (err) {
        console.warn('Mongo deleteEnquiry warning:', err.message);
      }
    }

    const store = getStore();
    store.enquiries = (store.enquiries || []).filter((e) => e._id !== id);
    saveStore(store);

    return res.json({ success: true, message: 'Enquiry deleted successfully' });
  } catch (error) {
    next(error);
  }
};
