const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    appointmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment',
        required: true
    },
    type: {
        type: String,
        enum: ['missed', 'rescheduled', 'reminder'],
        required: true
    },
    recipientType: {
        type: String,
        enum: ['patient', 'doctor'],
        required: true
    },
    recipientId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'sent', 'failed'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Notification', notificationSchema);