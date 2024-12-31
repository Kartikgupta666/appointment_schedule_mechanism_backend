const express = require('express');
const Registration = express.Router();
const Doctor = require('../modal/Doctor_Schema')
const Patient = require('../modal/patientSchema');



Registration.post("/DoctorRegistration", async (req, res) => {
    try {
        const { name, email, specialty, WorkingHrs, password } = req.body;
        // console.log(WorkingHrs)
        // Validate incoming data (can be expanded for detailed validation)
        if (!name || !email || !specialty || !WorkingHrs || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Create and Save Doctor
        const doctor = new Doctor({ name, email, specialty, WorkingHrs, Password: password });
        await doctor.save();
        res.status(201).json({ message: 'Doctor added successfully', doctor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}
)

Registration.get("/ALLDoctors", async (req, res) => {
    try {
        const doctor = await Doctor.find()
        if (doctor) {
            res.json(doctor);
        }
        else {
            res.json("no doctor found")
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
})


Registration.post("/PatientRegistration", async (req, res) => {
    try {
        const { name, age, bloodgroup, password , email } = req.body;
        if (!name || !age || !bloodgroup || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const patient = new Patient({ name, age, bloodgroup, Password: password , email});
        await patient.save()
        res.status(201).json({ message: 'patient added successfully', patient});

    }
    catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
})

module.exports = Registration