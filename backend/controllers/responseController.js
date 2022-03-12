const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const Response = require('../models/response')

exports.createResponse = catchAsyncErrors(async (req, res, next) => {
    const { _id: userId } = req.user
    const postId = req.params.post_id

    const response = await Response.create({...req.body, user: userId, post: postId})

    res.status(201).json({
        success: true,
        message: "New response created!",
        response
    })
})

exports.getAllResponses = catchAsyncErrors(async (req, res, next) => {
    const responses = await Response.find().populate('user').populate('post')

    res.status(200).json({
        success: true,
        responses
    })
})

exports.getAllPostResponses = catchAsyncErrors(async (req, res, next) => {
    const responses = await Response.find({"post": req.params.id}).populate('user').populate('post')

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

exports.updateResponse = catchAsyncErrors(async (req, res, next) => {
    let response = await Response.findById(req.params.id)

    if (!response) { return next(new ErrorHandler('Response not found', 404)) }

    response = await Response.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        response
    })
})

exports.deleteResponse = catchAsyncErrors(async (req, res, next) => {
    const response = await Response.findById(req.params.id)

    if (!response) { return next(new ErrorHandler('Response not found', 404)) }

    await response.remove()

    res.status(200).json({
        success: true,
        message: 'About is deleted successfully',
    })
})