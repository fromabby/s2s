const mongoose = require('mongoose')

const donationSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, 'Please enter content']
    },
    qr_code: {
        type: Array,
        required: [true, 'Please attach QR code'],
    }
})

module.exports = mongoose.model('Donation', donationSchema)