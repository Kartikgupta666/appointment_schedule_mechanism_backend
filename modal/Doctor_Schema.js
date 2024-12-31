const mongoose = require("mongoose")

const WorkingHrs = new mongoose.Schema({
    DayofWeeks: {
        type: String,
        required: true,
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    }
})



const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        require: true
    },
    specialty: {
        type: String,
        required: true
    },
    WorkingHrs: [WorkingHrs]
});



module.exports = mongoose.model('Doctor', doctorSchema);