const mongoose = require('mongoose')
const validator = require('validator')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter your email address'],
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid email address']
    },
    full_name:{
        type: String,
        required: [true, 'Please enter your password'],
        minLength: [6, 'Passwords must be at least 6 characters long'],
        select: false
    }
})


module.exports = mongoose.model('User', userSchema)