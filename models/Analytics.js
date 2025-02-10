const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  url: { type: mongoose.Schema.Types.ObjectId, ref: 'URL', required: true },
  clicks: { type: Number, default: 0 },
  uniqueUsers: { type: Number, default: 0 },
  clicksByDate: [{ date: Date, count: Number }],
  osType: [
    { osName: String, uniqueClicks: Number, uniqueUsers: Number }
  ],
  deviceType: [
    { deviceName: String, uniqueClicks: Number, uniqueUsers: Number }
  ],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Analytics', analyticsSchema);
