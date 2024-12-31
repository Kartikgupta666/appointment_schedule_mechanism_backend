const Slot = require("../modal/slotSchema")


const findAvailableSlots = async (doctorId) => {
    const availableSlot = await Slot.find({ doctorId, status: "Available" })
    return availableSlot;

}

module.exports = { findAvailableSlots }