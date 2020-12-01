const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const Doctor = require('../models/Doctor');

//@desc     Registration for doctor
//@route    POST /doctors/register
//@access   PUBLIC
router.post('/register', async(req, res) => {
    const {username, name, password} = req.body;
    try {
        let doctor = await Doctor.findOne({username})
        if (doctor) {
            return res.status(400).json({Username: 'Username alrady exist'})
        } else {
            const newDoctor = new Doctor({
                username,
                name,
                password
            });

            // encrypt password using bcrpt
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newDoctor.password, salt, (err, hash) => {
                    if (err) throw err;
                    newDoctor.password = hash;
                    try {
                        newDoctor.save()
                        return res.status(200).json({Register: 'Doctor has been registered', newDoctor});
                    } catch (err) {
                        console.error(err);
                    }
                });
            });
        }
    } catch (err) {
        console.error(err);
    }
})

//@desc     Login for doctor
//@route    POST /doctors/login
//@access   PUBLIC
router.post('/login', async(req, res) => {
    const {username, password} = req.body;
    try {
        let doctor = await Doctor.findOne({username: username});
        if (!doctor) {
            return res.status(404).json({UsernameError: 'Username does not exist'});
        } else {
            bcrypt.compare(password, doctor.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    const payLoad = {
                        id: doctor.id,
                        username: doctor.username,
                    }
                    jwt.sign(payLoad, process.env.SECRET, {expiresIn: 3600}, (err, token) => {
                        if (err) throw err;
                        res.json({
                            success: true,
                            token: 'Bearer ' + token
                        })
                    })
                } else {
                    res.status(400).json({PasswordError: 'password incorect'});
                }
            })
        }
    } catch (err) {
        console.error(err);
    }
})




module.exports = router;