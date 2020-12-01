const express = require('express');
const router = express.Router();
const passport = require('passport');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const Report = require('../models/Report');

//@desc     get all report of a patient
//@route    GET /reports/:status
//@access   PRIVATE
router.get('/:status', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        let report = await Report.find({status: req.params.status})
            .lean()
            .sort({ createdAt: 'asc' })
    
            return res.json({Report: 'Reports based on status', report}); 
    } catch (err) {
        console.error(err);
    }
});



module.exports = router;