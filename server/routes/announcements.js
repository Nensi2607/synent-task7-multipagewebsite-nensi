const express = require('express');
const router = express.Router();
const Announcement = require('../models/Announcement');
const { protect, authorize } = require('../middleware/auth');

// GET all announcements (public with optional filter)
router.get('/', async (req, res) => {
  try {
    const { category, priority } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (priority) filter.priority = priority;
    const announcements = await Announcement.find(filter)
      .populate('author', 'name role')
      .sort({ createdAt: -1 });
    res.json({ success: true, count: announcements.length, data: announcements });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET single announcement
router.get('/:id', async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id).populate('author', 'name role');
    if (!announcement) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: announcement });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST create (admin only)
router.post('/', protect, authorize('admin'), async (req, res) => {
  try {
    const announcement = await Announcement.create({ ...req.body, author: req.user._id });
    res.status(201).json({ success: true, data: announcement });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// PUT update (admin only)
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    if (!announcement) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: announcement });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE (admin only)
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndDelete(req.params.id);
    if (!announcement) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, message: 'Announcement deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
