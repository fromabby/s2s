const mongoose = require('mongoose')

const bannerSchema = new mongoose.Schema({
    image: {
        type: Array,
        required: [true, 'Please attach image'],
    }
})

module.exports = mongoose.model('Banner', bannerSchema)