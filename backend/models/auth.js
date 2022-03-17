const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const authSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter your email address'],
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid email address']
    },
    name: {
        first_name: {
            type: String,
            required: [true, 'Please enter your first name']
        },
        last_name: {
            type: String,
            required: [true, 'Please enter your last name']
        }
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minLength: [6, 'Passwords must be at least 6 characters long'],
        select: false
    },
    role: {
        type: String,
        required: [true, 'Please enter your role']
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
})

// Encrypting password before saving user
authSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    this.password = await bcrypt.hash(this.password, 10)
})

// compare user password
authSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

// return JWT Token
authSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_ADMIN_SECRET, {
        expiresIn: process.env.JWT_ADMIN_EXPIRES_TIME
    });
}

// Generate Password reset token
authSchema.methods.getResetPasswordToken = function () {
    // generate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    //encrypt token
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    //set token expire times                30 minutes
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000

    return resetToken
}

module.exports = mongoose.model('Auth', authSchema)