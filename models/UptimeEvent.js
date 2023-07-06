// Import necessary modules
const mongoose = require('mongoose');

// Define uptime event schema
const uptimeEventSchema = new mongoose.Schema({
  monitor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Monitor',
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
  isUp: {
    type: Boolean,
    required: true,
  },
  responseTime: {
    type: Number,
    required: true,
  },
  confirmedByAgent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MonitoringAgent',
  },
});

// Create and export the uptime event model
module.exports = mongoose.model('UptimeEvent', uptimeEventSchema);
