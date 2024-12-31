const { mongoose, Schema } = require("mongoose")

const slotSchema = new Schema({
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    patiendId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        default: null
    },
    start_Time: {
        type: String,
        required: true
    },
    end_Time: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Available'
    },
    createAt: {
        type: Date,
        default : Date.now
    }
})

module.exports = mongoose.model("slotSchema", slotSchema)

