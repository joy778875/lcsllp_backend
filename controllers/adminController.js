import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import { isMongoDBConnected } from '../config/db.js';

export const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: 'Please provide email and password' });
    }

    const inputEmail = email.toLowerCase().trim();
    const envEmail = (process.env.ADMIN_EMAIL || 'admin@arvindllc.com').toLowerCase().trim();
    const envPassword = process.env.ADMIN_PASSWORD || 'admin123';

    let admin = null;
    let isAuthenticated = false;

    // Check MongoDB if connected
    if (isMongoDBConnected()) {
      try {
        admin = await Admin.findOne({ email: inputEmail });
        if (admin) {
          isAuthenticated = await bcrypt.compare(password, admin.password);
        }
      } catch (dbErr) {
        console.warn('DB Query failed, falling back to env credentials:', dbErr.message);
      }
    }

    // Fallback authentication check if DB record not found or DB disconnected
    if (!isAuthenticated && inputEmail === envEmail) {
      if (password === envPassword || (admin && (await bcrypt.compare(password, admin.password)))) {
        isAuthenticated = true;
      }
    }

    if (!isAuthenticated) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid admin credentials' });
    }

    const adminId = admin ? admin._id : 'demo_admin_id';
    const adminName = admin ? admin.name : 'Super Admin';

    const token = jwt.sign(
      { id: adminId, email: inputEmail },
      process.env.JWT_SECRET || 'default_jwt_secret_dev_key',
      { expiresIn: '7d' }
    );

    return res.json({
      success: true,
      token,
      admin: {
        id: adminId,
        email: inputEmail,
        name: adminName,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    if (isMongoDBConnected() && req.admin.id !== 'demo_admin_id') {
      const admin = await Admin.findById(req.admin.id).select('-password');
      if (admin) {
        return res.json({ success: true, admin });
      }
    }

    // Fallback return for demo mode
    return res.json({
      success: true,
      admin: {
        id: req.admin.id || 'demo_admin_id',
        email: req.admin.email || 'admin@arvindllc.com',
        name: 'Super Admin',
      },
    });
  } catch (error) {
    next(error);
  }
};
