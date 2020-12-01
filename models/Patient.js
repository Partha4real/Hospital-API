const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: true,
        //unique: true
    },
    name: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("Patient", PatientSchema);