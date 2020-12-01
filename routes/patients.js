const express = require('express');
const router = express.Router();
const passport = require('passport');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const Report = require('../models/Report');

//@desc     Registration for patient
//@route    POST /patients/register
//@access   PRIVATE
router.post('/register',  passport.authenticate('jwt', {session: false}) ,async(req, res) => {
    const {phone, name} = req.body;
    try {
        let patient = await Patient.findOne({phone})
        if (patient) {
            return res.status(200).json({Patient: 'Patient alrady exist', patient});
        } else {
            const newPatient = new Patient({
                phone,
                name
            });
            try {
                newPatient.save()
                return res.status(200).json({Register: 'Patient has been registered', newPatient});
            } catch (err) {
                console.error(err);
            }
        }
    } catch (err) {
        console.error(err);
    }
})

//@desc     create report
//@route    POST /patients/:id/create_report
//@access   PRIVATE
router.post('/:id/create_report', passport.authenticate('jwt', {session: false}), async(req, res) => {
    const {status} = req.body;
    try {
        let patient = await Patient.findById(req.params.id)
        if (!patient) {
            return res.status(404).json({PatientIDError: 'Patient Id does not exist'})
        } else {
            const newReport = new Report({
                user: patient.id,
                status,
                doctorName: req.user.name,
                patientrName:  patient.name
            })
            try {
                newReport.save();
                return res.json({Report: 'Patient report created', newReport});
            } catch (err) {
                console.log(err);
            }
        }
    } catch (err) {
        console.error(err);
    }
    
});

//@desc     get all report of a patient
//@route    GET /patients/:id/all_reports
//@access   PRIVATE
router.get('/:id/all_reports', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        let patient = await Patient.findById(req.params.id)
        if (!patient) {
            return res.status(404).json({PatientIDError: 'Patient Id does not exist'})
        } else {
            try {
                const report = await Report.find({user:req.params.id})
                    .lean()
                    .sort({ createdAt: 'asc' })
        
                    return res.json({Report: 'Patient All report', report});
            } catch (err) {
                console.error(err);
                res.render('error/500');
            }
        }
    } catch (err) {
        console.error(err);
    }
});


module.exports = router;