const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    doctorName: {
        type: String,
        required: true
    },
    patientrName: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'negative',
        enum: ['negative', 'travelled-quarantine', 'symptoms-quarantine' , 'positive-admit']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("Report", ReportSchema);