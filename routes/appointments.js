const express = require('express');
const appointment = express.Router();
const {
  rescheduleAppointment
} = require('../controller/appointmentController');

const Appointment = require('../modal/appointmentSchema');
// const slotSchema = require('../modal/slotSchema');

// Reschedule an appointment
appointment.put('/:id/reschedule', async (req, res) => {
  try {
    const { id } = req.params;
    const { newTime } = req.body;
    const result = await rescheduleAppointment(id, newTime);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// list the appointments which patient booked

appointment.get("/allappointments", async (req, res) => {
  const { id } = req.body
  try {
    const result = await Appointment.find({
      patientId: id
    })
    if (result) {
      //  console.log(result)
      res.json(result)
    }
    else {
      res.json({ message: "no appointments found" })
    }
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message });
  }

})








// create an appointment
appointment.post('/createAppointment', async (req, res) => {
  try {
    const { id } = req.params; // this is the patientId from the URL
    const { doctorId, status, originalAppointmentId } = req.body;

    // Validate required fields
    if (!id || !doctorId) {
      return res.status(400).json({ error: 'PatientId, DoctorId, and ScheduledTime are required.' });
    }
    // slot ko update krne ka kamm rhe gya hai


    // Create a new appointment
    const result = new Appointment({
      patientId: id, // Use `id` from params as `patientId`
      doctorId,      // Use the correct `doctorId` from the slotSchema
      status: status || 'scheduled', // Default status to 'scheduled' if not provided
      originalAppointmentId: originalAppointmentId || null, // Default to null if not provided Slotid
    });

    // Save the appointment
    await result.save();
    res.status(201).json({ message: 'Appointment created successfully', result });
  } catch (err) {
    console.error(err); // Log the full error for debugging
    res.status(500).json({ error: err.message });
  }
});


module.exports = appointment;