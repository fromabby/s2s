const mongoose = require('mongoose')

const donationSchema = new mongoose.Schema({
    qr_code: {
        type: Array,
        required: [true, 'Please attach QR code'],
    },
    bank_name: {
        type: String,
        required: [true, 'Please enter bank name']
    },
    account_details: {
        account_number: {
            type: String,
            required: [true, 'Please enter account number']
        },
        account_name: {
            type: String,
            required: [true, 'Please enter account name']
        }
    },
    instructions: {
        type: String,
        required: [true, 'Please enter instructions']
    },
    donation_link: {
        type: String,
        required: [true, 'Please enter donation link']
    }
})

module.exports = mongoose.model('Donation', donationSchema)