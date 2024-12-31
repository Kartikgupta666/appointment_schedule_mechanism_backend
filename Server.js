const express = require('express')
const cors = require('cors')
const cron = require("node-cron")
const { connection } = require("./Database/mongo_DB")
const Registration = require('./routes/Registration')
const appointment = require('./routes/appointments')
const slot = require('./routes/slots')
const login = require('./routes/Login')
const Slot = require('./modal/slotSchema')

const app = express()
app.use(cors())
app.use(express.json())
const port = 8000

connection()

app.use("/register", Registration)
app.use("/appointment", appointment)
app.use("/Slot", slot)
app.use("/login", login)


// front end se date kis format mai bhejni hai
// YYYY:MM:DDTHH:MM
// 2024-12-04T00:53

function formatTime(number) {
    return number < 10 ? '0' + number : number;
}


const checkMissedAppointments = async () => {
    try {
        let now = new Date();
        let hours = formatTime(now.getHours());
        let minutes = formatTime(now.getMinutes() + 15);

        const currTime = `${hours}:${minutes}`
        console.log(currTime)
        const missedAppointment = await Slot.find({
            start_Time: { $lte: currTime },
            status: { $in: ["scheduled", "Available"] }
        })
        console.log(missedAppointment.map(app => app._id))
        await Slot.updateMany(
            { _id: { $in: missedAppointment.map(app => app._id) } },
            { $set: { status: 'missed' } }
        )

    }
    catch (error) {
        console.error('Error checking missed appointments:', error);
    }
};

// Schedule the function to run every minute
cron.schedule('* * * * *', checkMissedAppointments);



app.listen(port, () => {
    console.log(`server is running on ${port}`);
})
