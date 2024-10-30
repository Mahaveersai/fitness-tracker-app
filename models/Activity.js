const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true }, // e.g., Running, Cycling
    duration: { type: Number, required: true }, // Duration in minutes
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Activity', ActivitySchema);
