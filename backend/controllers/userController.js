const User = require('../models/user')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const sendToken = require('../utils/jwtToken')
const sendEmail = require('../utils/sendEmail')
const jwt = require('jsonwebtoken')

exports.verifyUserEmail = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })

    if (user) {
        sendToken(user, "viewer", 200, res)
    } else {
        const otp = Math.floor(100000 + Math.random() * 9000)

        const slug = jwt.sign({ email: req.body.email, otp, post_id: req.body.post_id }, process.env.ACCOUNT_TOKEN, { expiresIn: process.env.REGISTER_EXPIRES })

        try {
            // const message = await resetPassword({ link })

            await sendEmail({
                email: req.body.email,
                subject: 'STREETSTOSCHOOLS Verify Email',
                message: `<p>Your otp is ${otp}</p>`
            })

            res.status(200).json({
                success: true,
                slug,
                otp,
                message: `OTP sent.\nKindly check your inbox or spam.`
            })
        } catch (error) {
            return next(new ErrorHandler(error.message, 500))
        }
    }
})

exports.saveUser = catchAsyncErrors(async (req, res, next) => {
    const token = req.params.token
    const { full_name } = req.body

    if (token) {
        jwt.verify(token, process.env.ACCOUNT_TOKEN, function (err, user) {
            if (err) { return next(new ErrorHandler('Token is invalid or expired')) }

            const { email, otp, post_id } = user

            if (Number(req.body.otp) === otp) {
                User.findOne({ email }).exec((err, existingUser) => {
                    if (existingUser) { return next(new ErrorHandler('Email already exists')) }
                    const newUser = User.create({ email, full_name }).then((user) => {
                        const createdUser = { user, post_id }
                        return sendToken(createdUser, "viewer", 200, res)
                    }
                    )
                })
            } else {
                return next(new ErrorHandler('Invalid OTP'))
            }
        })
    } else {
        return next(new ErrorHandler('Token is invalid or expired'))
    }
})