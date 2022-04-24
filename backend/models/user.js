const mongoose = require('mongoose')
const validator = require('validator')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter your email address'],
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid email address']
    },
    full_name:{
        type: String,
        required: [true, 'Please enter your name'],
    }
})

// return JWT Token
userSchema.methods.getJwtToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_VIEWER_SECRET, {
        expiresIn: (60 * 1000 * 15)
    });
}

module.exports = mongoose.model('User', userSchema)