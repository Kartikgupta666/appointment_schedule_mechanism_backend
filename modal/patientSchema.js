const mongoose = require("mongoose")

const PatientSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    Password: {
        type: String,
        require: true
    },
    bloodgroup: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model("Patient", PatientSchema)
