const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  category: {
    type: String,
    enum: ['cultural', 'technical', 'sports', 'academic', 'workshop'],
    default: 'academic',
  },
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  registeredStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  maxCapacity: { type: Number, default: 100 },
  image: { type: String, default: '' },
  status: { type: String, enum: ['upcoming', 'ongoing', 'completed'], default: 'upcoming' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Event', eventSchema);
