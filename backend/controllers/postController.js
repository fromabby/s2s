const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const Post = require('../models/post')
const cloudinary = require('cloudinary').v2

//*for about us content
exports.createPost = catchAsyncErrors(async (req, res, next) => {
    const { _id: authorId } = req.user

    const images = req.files

    const post = await Post.create({...req.body, author: authorId, images})

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

    let images = req.files

    const oldImages = post.images
    const length = oldImages && oldImages.length
    let ids = []

    for (let i = 0; i < length; i++) {
        ids.push(oldImages[i].filename)
    }

    if (images == null || images == '') {
        images = post.images
    } else {
        if (ids.length != 0) {
            for (let x = 0; x < ids.length; x++) {
                cloudinary.uploader.destroy(ids[x],
                    { resource_type: 'raw' })
            }
        }
    }

    post = await Post.findByIdAndUpdate(req.params.id, {...req.body, images }, {
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

    const images = post.images
    const length = images.length
    let ids = []

    for (let i = 0; i < length; i++) {
        ids.push(images[i].filename)
    }

    if (ids.length != 0) {
        for (let x = 0; x < ids.length; x++) {
            cloudinary.uploader.destroy(ids[x],
                { resource_type: 'raw' })
        }
    }

    await post.remove()

    res.status(200).json({
        success: true,
        message: 'About is deleted successfully',
    })
})