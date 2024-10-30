const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    type: { type: String, required: true },
    target: { type: Number, required: true },
    achieved: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Goal', GoalSchema);
