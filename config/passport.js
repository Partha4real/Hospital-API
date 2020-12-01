const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const Doctor = require('../models/Doctor');

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET;
module.exports = (passport) => {
    passport.use(new JwtStrategy(opts, async(jwt_payload, done) => {
        try {
            let doctor = await Doctor.findById(jwt_payload.id);
            if (doctor) {
                done(null, doctor)
            } else {
                done(null, false)
            }
        } catch (err) {
            console.error(err);
        }
    }))
}