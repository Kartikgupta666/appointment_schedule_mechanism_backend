const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    status: {
        type: String,
        enum: ['scheduled', 'completed', 'missed', 'rescheduled', 'cancelled'],
        default: 'scheduled'
    },
    originalSlotId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'slotSchema'
    }
});

module.exports = mongoose.model('Appointment', appointmentSchema);