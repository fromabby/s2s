const mongoose = require('mongoose')

const registrationSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, 'Please enter content'],
    }
})

module.exports = mongoose.model('Registration', registrationSchema)