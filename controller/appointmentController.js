const Appointment = require('../modal/appointmentSchema')


async function rescheduleAppointment(id, newTime) {
    try {
        const result = await Appointment.findById(id)
        result.scheduledTime = newTime;
        result.save();
        return result;
    }
    catch (err) {
        res.status(401).json("something went wronge : " + err)
    }
}


module.exports = { rescheduleAppointment }