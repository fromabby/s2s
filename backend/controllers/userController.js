const User = require('../models/user')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const sendEmail = require('../utils/sendEmail')
const jwt = require('jsonwebtoken')

exports.verifyUserEmail = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email })

    if (user) {
        res.status(200).json({
            success: true,
            message: "User exists"
        })
    } else {

        const registerToken = jwt.sign({ email }, process.env.ACCOUNT_TOKEN, { expiresIn: process.env.REGISTER_EXPIRES })

        // create reset password url
        const link = `${req.protocol}://${process.env.HOST}/verify/${registerToken}`
        try {
            // const message = await resetPassword({ link })

            await sendEmail({
                email: user.email,
                subject: 'STREETSTOSCHOOLS Verify Email',
                message: `<p>${link}</p>`
            })

            res.status(200).json({
                success: true,
                message: `Email sent.\nKindly check your inbox or spam.`
            })

        } catch (error) {
            user.resetPasswordToken = undefined
            user.resetPasswordExpire = undefined

            await user.save({ validateBeforeSave: false })
            return next(new ErrorHandler(error.message, 500))
        }
    }
})

exports.saveUser = catchAsyncErrors(async (req, res, next) => {
    const token = req.params.token

    if (token) {
        jwt.verify(token, process.env.ACCOUNT_TOKEN, function (err, user) {
            if (err) { return next(new ErrorHandler('Token is invalid or expired')) }

            const { email } = user

            User.findOne({ email }).exec((err, existingUser) => {
                if (existingUser) { return next(new ErrorHandler('Email already exists')) }
                const newUser = User.create(user).then(() =>
                    res.status(201).json({
                        success: true,
                        message: `Congratulations ${full_name}! You may now leave and manage your comments.`
                    })
                )
            })
        })
    } else {
        return next(new ErrorHandler('Token is invalid or expired'))
    }
})