const mongoose = require('mongoose')

const recordSchema = new mongoose.Schema({
    record_date: {
        type: Date,
        default: new Date(Date.now())
    },
    record_name: {
        type: String,
        required: [true, 'Please enter record name'],
    },
    record_platform: {
        type: String,
        required: [true, 'Please enter record platform'],
    },
    record_amount: {
        type: String,
        required: [true, 'Please enter record amount']
    }
})

module.exports = mongoose.model('Record', recordSchema)