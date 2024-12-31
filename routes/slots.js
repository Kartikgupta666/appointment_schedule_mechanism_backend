const express = require('express');
const slotSchema = require("../modal/slotSchema")
const slot = express.Router();
const { findAvailableSlots } = require('../controller/slotController');

// Get available slots for a doctor
slot.get('/availableSlot', async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id)
    const slots = await findAvailableSlots(id);
    res.json(slots);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

slot.post('/createSlot', async (req, res) => {
  try {
    const { id, start_Time, end_Time, patiendId } = req.body;
    if (!id || !start_Time || !end_Time) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const slot = new slotSchema({ doctorId: id, start_Time: start_Time, end_Time: end_Time, patiendId: patiendId || null })
    await slot.save()
    res.status(201).json({ message: 'Slot created successfully' });


  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})



module.exports = slot;