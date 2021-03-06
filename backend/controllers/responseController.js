const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const Response = require('../models/response')

//*responses
exports.createResponse = catchAsyncErrors(async (req, res, next) => {
    const { _id: userId } = req.user
    const postId = req.params.post_id

    const responses = await Response.find({user: userId})

    const count = responses.map(response => new Date(response.createdAt).getDate() === new Date(Date.now()).getDate()).length

    if(count > 20) { return next(new ErrorHandler('Exceeded max comment for the day', 404)) }
    const response = await Response.create({ ...req.body, user: userId, post: postId, createdAt: new Date(Date.now()) })


    await response.populate('user')

    res.status(201).json({
        success: true,
        message: "New response created!",
        response
    })
})

exports.getAllResponses = catchAsyncErrors(async (req, res, next) => {
    const status = req.params.status

    let responses
    if (status) {
        responses = await Response.find({ status }).populate('user').populate('post')
    }
    else {
        responses = await Response.find().populate('user').populate('post')
    }

    res.status(200).json({
        success: true,
        responses
    })
})

exports.getSingleResponse = catchAsyncErrors(async (req, res, next) => {
    const response = await Response.findById(req.params.id).populate("post").populate('user')

    if (!response) { return next(new ErrorHandler('Response not found', 404)) }


    res.status(200).json({
        success: true,
        response
    })
})

exports.deleteViewerResponse = catchAsyncErrors(async (req, res, next) => {
    const response = await Response.findOne({ _id: req.params.id, user: req.user._id })

    if (!response) { return next(new ErrorHandler('Response not found', 404)) }

    await response.remove()

    res.status(200).json({
        success: true,
        message: 'Response is deleted successfully',
    })
})

//*for superadmin and admin
exports.updateResponse = catchAsyncErrors(async (req, res, next) => {
    let response = await Response.findById(req.params.id)

    if (!response) { return next(new ErrorHandler('Response not found', 404)) }

    response = await Response.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    await response.populate('user')

    res.status(200).json({
        success: true,
        response
    })
})

exports.deleteAdminResponse = catchAsyncErrors(async (req, res, next) => {
    const response = await Response.findOne({ _id: req.params.id })

    if (!response) { return next(new ErrorHandler('Response not found', 404)) }

    await response.remove()

    res.status(200).json({
        success: true,
        message: 'Response is deleted successfully',
    })
})

//*posts
exports.getAllPostResponses = catchAsyncErrors(async (req, res, next) => {
    const status = req.params.status
    const responses = await Response.find({ "post": req.params.id, status }).populate('user').populate('post')

    res.status(200).json({
        success: true,
        responses
    })
})