// Import necessary modules
const mongoose = require('mongoose');

// Define monitor schema
const monitorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  isPaused: {
    type: Boolean,
    default: false,
  },
});

// Create and export the monitor model
module.exports = mongoose.model('Monitor', monitorSchema);
