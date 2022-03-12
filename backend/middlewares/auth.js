const User = require('../models/auth')
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("./catchAsyncErrors")
const jwt = require('jsonwebtoken')

// Checks if user is authenticated or not
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const { admin } = req.cookies

    if (!admin) { return next(new ErrorHandler('Login first to access this resource.', 401)) }

    const decoded = jwt.verify(admin, process.env.JWT_ADMIN_SECRET)
    req.user = await User.findById(decoded.id)
    
    next()
})

exports.isVerified = catchAsyncErrors(async (req, res, next) => {
    const { viewer } = req.cookies

    if (!viewer) { return next(new ErrorHandler('Verify email first to access this resource.', 401)) }

    const decoded = jwt.verify(viewer, process.env.JWT_VIEWER_SECRET)
    req.user = await User.findById(decoded.id)
    
    next()
})

// Handling users roles
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) { return next(new ErrorHandler(`Role ${req.user.role} is not allowed to access this resource`, 403)) }
        next()
    }
}