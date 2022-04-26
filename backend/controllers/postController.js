const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Post = require("../models/post");
const Response = require("../models/response");
const cloudinary = require("cloudinary").v2;
const APIFeatures = require('../utils/apiFeatures')

//*for about us content
exports.createPost = catchAsyncErrors(async (req, res, next) => {
    const images = req.files;

    const post = await Post.create({ ...req.body, images });

    res.status(201).json({
        success: true,
        message: "New post created!",
        post,
    });
});

exports.getAllPosts = catchAsyncErrors(async (req, res, next) => {
    const resPerPage = 9

    const postCount = await Post.countDocuments()

    const apiFeatures = new APIFeatures(Post.find(), req.query)
        .search()
        .filter()
        .pagination(resPerPage)

    const posts = await apiFeatures.query;

    res.status(200).json({
        success: true,
        posts,
        postCount,
        resPerPage
    });
});

exports.getSinglePost = catchAsyncErrors(async (req, res, next) => {
    const post = await Post.findById(req.params.id);

    if (!post) {
        return next(new ErrorHandler("Post not found", 404));
    }

    res.status(200).json({
        success: true,
        post,
    });
});

exports.updatePost = catchAsyncErrors(async (req, res, next) => {
    let post = await Post.findById(req.params.id);

    if (!post) {
        return next(new ErrorHandler("Post not found", 404));
    }

    let images = req.files;

    const oldImages = post.images;
    const length = oldImages && oldImages.length;
    let ids = [];

    for (let i = 0; i < length; i++) {
        ids.push(oldImages[i].filename);
    }

    if (images == null || images == "") {
        images = post.images;
    } else {
        if (ids.length != 0) {
            for (let x = 0; x < ids.length; x++) {
                cloudinary.uploader.destroy(ids[x], { resource_type: "raw" });
            }
        }
    }
    var oldDateObj = new Date();
    var newDateObj = new Date();
    newDateObj.setTime(oldDateObj.getTime() + 131400 * 60 * 1000);

    let expiresAt = req.body.isArchived ? newDateObj : null;

    post = await Post.findByIdAndUpdate(
        req.params.id,
        { ...req.body, expiresAt, images, updatedAt: new Date(Date.now()) },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        }
    );

    console.log(post);

    res.status(200).json({
        success: true,
        post,
    });
});

exports.deletePost = catchAsyncErrors(async (req, res, next) => {
    const post = await Post.findById(req.params.id);

    if (!post) {
        return next(new ErrorHandler("Post not found", 404));
    }

    await Response.deleteMany({ post: req.params.id });

    const images = post.images;
    const length = images.length;
    let ids = [];

    for (let i = 0; i < length; i++) {
        ids.push(images[i].filename);
    }

    if (ids.length != 0) {
        for (let x = 0; x < ids.length; x++) {
            cloudinary.uploader.destroy(ids[x], { resource_type: "raw" });
        }
    }

    await post.remove();

    res.status(200).json({
        success: true,
        message: "About is deleted successfully",
    });
});
