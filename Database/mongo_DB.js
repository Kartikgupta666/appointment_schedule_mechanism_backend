const mongoose = require("mongoose")

const url = "mongodb+srv://kartikgangil:0123456@cluster0.eqzdo.mongodb.net/"
function connection() {
    mongoose.connect(url).then(() => {
        console.log("Database connected")
    }).catch((err) => {
        console.error("something happend" + err)
    })
}

module.exports = {connection}