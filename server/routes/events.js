const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const { protect, authorize } = require('../middleware/auth');

// GET all events
router.get('/', async (req, res) => {
  try {
    const { category, status } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (status) filter.status = status;
    const events = await Event.find(filter)
      .populate('organizer', 'name')
      .sort({ date: 1 });
    res.json({ success: true, count: events.length, data: events });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET single event
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('organizer', 'name')
      .populate('registeredStudents', 'name email');
    if (!event) return res.status(404).json({ success: false, message: 'Event not found' });
    res.json({ success: true, data: event });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST create event (admin)
router.post('/', protect, authorize('admin'), async (req, res) => {
  try {
    const event = await Event.create({ ...req.body, organizer: req.user._id });
    res.status(201).json({ success: true, data: event });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// PUT update event (admin)
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!event) return res.status(404).json({ success: false, message: 'Event not found' });
    res.json({ success: true, data: event });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE event (admin)
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST register for event (student)
router.post('/:id/register', protect, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ success: false, message: 'Event not found' });
    if (event.registeredStudents.includes(req.user._id)) {
      return res.status(400).json({ success: false, message: 'Already registered' });
    }
    if (event.registeredStudents.length >= event.maxCapacity) {
      return res.status(400).json({ success: false, message: 'Event is full' });
    }
    event.registeredStudents.push(req.user._id);
    await event.save();
    res.json({ success: true, message: 'Registered successfully', data: event });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE unregister from event
router.delete('/:id/register', protect, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    event.registeredStudents = event.registeredStudents.filter(
      (id) => id.toString() !== req.user._id.toString()
    );
    await event.save();
    res.json({ success: true, message: 'Unregistered successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
