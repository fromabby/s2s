const mongoose = require('mongoose')

const registrationSchema = new mongoose.Schema({
    registrationType: {
        type: Number,
        required: [true, 'Please enter type'],
    },
    link: {
        type: String,
        required: [true, 'Please enter link'],
    }
})

module.exports = mongoose.model('Registration', registrationSchema)