import TeamMember from '../models/TeamMember.js';
import { isMongoDBConnected } from '../config/db.js';
import { getStore, saveStore } from '../config/storage.js';

export const getTeamMembers = async (req, res, next) => {
  try {
    if (isMongoDBConnected()) {
      const team = await TeamMember.find().sort({ order: 1, createdAt: 1 });
      if (team && team.length > 0) {
        return res.json({ success: true, count: team.length, team });
      }
    }

    const store = getStore();
    return res.json({
      success: true,
      count: store.team?.length || 0,
      team: store.team || [],
    });
  } catch (error) {
    const store = getStore();
    res.json({
      success: true,
      count: store.team?.length || 0,
      team: store.team || [],
    });
  }
};

export const createTeamMember = async (req, res, next) => {
  try {
    const { name, designation, photo, bio, socialLink, verified, order } = req.body;
    if (!name || !designation) {
      return res.status(400).json({ success: false, message: 'Name and designation are required' });
    }

    const newMember = {
      _id: 'team_' + Date.now().toString(),
      name,
      designation,
      photo: photo || '',
      bio: bio || '',
      socialLink: socialLink || 'https://linkedin.com',
      verified: verified !== undefined ? Boolean(verified) : true,
      order: order !== undefined ? Number(order) : 0,
      createdAt: new Date().toISOString(),
    };

    if (isMongoDBConnected()) {
      try {
        const created = await TeamMember.create(newMember);
        newMember._id = created._id;
      } catch (err) {
        console.warn('Mongo createTeamMember warning:', err.message);
      }
    }

    const store = getStore();
    if (!store.team) store.team = [];
    store.team.push(newMember);
    saveStore(store);

    return res.status(201).json({
      success: true,
      message: 'Team member added successfully',
      member: newMember,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTeamMember = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (isMongoDBConnected()) {
      try {
        await TeamMember.findByIdAndUpdate(id, updateData, { new: true });
      } catch (err) {
        console.warn('Mongo updateTeamMember warning:', err.message);
      }
    }

    const store = getStore();
    const index = (store.team || []).findIndex((m) => m._id === id);
    if (index !== -1) {
      store.team[index] = {
        ...store.team[index],
        ...updateData,
      };
      saveStore(store);
      return res.json({
        success: true,
        message: 'Team member updated successfully',
        member: store.team[index],
      });
    }

    return res.status(404).json({ success: false, message: 'Team member not found' });
  } catch (error) {
    next(error);
  }
};

export const deleteTeamMember = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (isMongoDBConnected()) {
      try {
        await TeamMember.findByIdAndDelete(id);
      } catch (err) {
        console.warn('Mongo deleteTeamMember warning:', err.message);
      }
    }

    const store = getStore();
    store.team = (store.team || []).filter((m) => m._id !== id);
    saveStore(store);

    return res.json({ success: true, message: 'Team member deleted successfully' });
  } catch (error) {
    next(error);
  }
};
