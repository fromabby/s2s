const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const Post = require('../models/post')


//*for about us content
exports.createPost = catchAsyncErrors(async (req, res, next) => {

    const { _id: authorId } = req.user

    const post = await Post.create({...req.body, author: authorId})

    res.status(201).json({
        success: true,
        message: "New post created!",
        post
    })
})

exports.getAllPosts = catchAsyncErrors(async (req, res, next) => {
    const posts = await Post.find().populate('author')

    res.status(200).json({
        success: true,
        posts
    })
})

exports.getSinglePost = catchAsyncErrors(async (req, res, next) => {
    const post = await Post.findById(req.params.id).populate('author')

    if (!post) { return next(new ErrorHandler('Post not found', 404)) }


    res.status(200).json({
        success: true,
        post
    })
})

exports.updatePost = catchAsyncErrors(async (req, res, next) => {
    let post = await Post.findById(req.params.id)

    if (!post) { return next(new ErrorHandler('Post not found', 404)) }

    post = await Post.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        post
    })
})

exports.deletePost = catchAsyncErrors(async (req, res, next) => {
    const post = await Post.findById(req.params.id)

    if (!post) { return next(new ErrorHandler('Post not found', 404)) }

    await post.remove()

    res.status(200).json({
        success: true,
        message: 'About is deleted successfully',
    })
})