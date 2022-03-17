const User = require('../models/auth')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const sendToken = require('../utils/jwtToken')
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto')
const passVal = require('../utils/passwordValidation')

// templates
// const verifyEmail = require('../config/templates/verifyEmail')

exports.login = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) { return next(new ErrorHandler('Please enter your credentials', 400)) }

    const user = await User.findOne({ email }).select('+password')

    if (!user) { return next(new ErrorHandler('Invalid Credentials', 401)) }

    const isPasswordMatched = await user.comparePassword(password)
    if (!isPasswordMatched) { return next(new ErrorHandler('Invalid Credentials', 401)) }

    sendToken(user, "admin", 200, res)
})

exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie('admin', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    // res.cookie('viewer', null, {
    //     expires: new Date(Date.now()),
    //     httpOnly: true
    // })

    res.status(200).json({
        success: true,
        message: 'Logged out'
    })
})

exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })

    if (!user) { return next(new ErrorHandler('Email does not exist', 404)) }

    const resetToken = user.getResetPasswordToken()

    await user.save({ validateBeforeSave: false })

    const link = `${req.protocol}://${process.env.HOST}/password/reset/${resetToken}`

    try {
        // const message = await resetPassword({ link })

        await sendEmail({
            email: user.email,
            subject: 'STREETSTOSCHOOLS Password Recovery',
            message: `<h1>Reset link: ${link}</h1>`
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
})

exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')
    const { password, confirmPassword } = req.body

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })
    if (!user) { return next(new ErrorHandler('Password reset link is invalid or has expired')) }
    if (passVal.validate(req.body.password) !== true) { return next(new ErrorHandler('Please follow password format', 400)) }
    if (password !== confirmPassword) { return next(new ErrorHandler('Password does not match')) }

    user.password = password
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save()

    res.status(200).json({
        success: true,
        message: `Password has been updated`
    })
})

exports.register = catchAsyncErrors(async (req, res, next) => {
    const { email, name, password, role, confirmPassword } = req.body

    console.log(name)
    if (passVal.validate(req.body.password) !== true) { return next(new ErrorHandler('Please follow password format', 400)) }
    if (password !== confirmPassword) { return next(new ErrorHandler('Password does not match')) }

    const user = await User.findOne({ email })

    if (user) { return next(new ErrorHandler('Email account already exists', 404)) }

    const newUser = await User.create({ email, name, password, role })

    console.log(newUser)
    res.status(201).json({
        success: true,
        message: "User created successfully",
        newUser
    })
})

exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password')

    console.log(user)
    const { oldPassword, password, confirmPassword } = req.body
    const isMatched = await user.comparePassword(oldPassword)

    if (!isMatched) { return next(new ErrorHandler('Old password is incorrect')) }
    if (passVal.validate(req.body.password) !== true) { return next(new ErrorHandler('Please follow password format', 400)) }
    if (password !== confirmPassword) { return next(new ErrorHandler('Password and Confirm Password does not match')) }

    user.password = password

    await user.save()
    console.log('saved')
    sendToken(user, user.role, 200, res)
})

exports.getMyProfile = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id)

    res.status(200).json({
        success: true,
        user
    })
})

exports.updateMyProfile = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.user.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        user
    })
})

exports.getUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find()

    res.status(200).json({
        success: true,
        users
    })
})

exports.getUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id)

    if (!user) { return next(new ErrorHandler(`User not found with this id:(${req.params.id})`)) }

    res.status(200).json({
        success: true,
        user
    })
})

exports.updateUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    if (!user) { return next(new ErrorHandler(`User not found with this id:(${req.params.id})`)) }

    res.status(200).json({
        success: true,
        user,
        message: "User successfully updated"
    })
})

exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id)

    if (!user) { return next(new ErrorHandler(`User not found with this id:(${req.params.id})`)) }

    await user.remove()

    res.status(200).json({
        success: true,
        message: "User has been deleted"
    })
})