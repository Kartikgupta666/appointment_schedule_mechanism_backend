const express = require('express');
const Doctor = require('../modal/Doctor_Schema');
const patient = require('../modal/patientSchema');
const Login = express.Router();


Login.post("/Doctor", async(req, res) => {
    const { email, password } = req.body
    try {
        const result = await Doctor.findOne({ email })
        if (result) {
            if (password === result.Password) {
                res.json({ result ,message :"success"})
            }
            else {
                res.json("fail")
            }
        }
        else {
            res.json("no user found")
        }
    }
    catch(err) {
        res.status(500).json({ error: err.message });
    }
})

Login.post("/Patient", async(req, res) => {
    const { email, password } = req.body
    try {
        const result = await patient.findOne({ email })
        if (result) {
            if (password === result.Password) {
                res.json({ result, message: "success" })
            }
            else {
                res.json("fail")
            }
        }
        else {
            res.json("no user found")
        }
    }
    catch(err) {
        res.status(500).json({ error: err.message });
    }
})


module.exports = Login