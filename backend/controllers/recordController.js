const Record = require('../models/record')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const APIFeatures = require('../utils/apiFeatures')

exports.createRecord = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.create(req.body)

    res.status(201).json({
        success: true,
        message: "New product added!",
        product
    })
})

exports.getAllRecords = catchAsyncErrors(async (req, res, next) => {
    const products = await Product.find()
    
    res.status(200).json({
        success: true,
        productCount,
        products
    })
})

exports.getSingleRecord = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id)

    if (!product) { return next(new ErrorHandler('Product not found', 404)) }

    res.status(200).json({
        success: true,
        product
    })
})

exports.updateRecord = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id)

    if (!product) { return next(new ErrorHandler('Product not found', 404)) }

    let newImages = req.files

    const oldImages = product.images
    const length = oldImages && oldImages.length
    let ids = []

    for (let i = 0; i < length; i++) {
        ids.push(oldImages[i].filename)
    }

    if (newImages == null || newImages == '') {
        newImages = product.images
    } else {
        if (ids.length != 0) {
            for (let x = 0; x < ids.length; x++) {
                cloudinary.uploader.destroy(ids[x],
                    { resource_type: 'raw' })
            }
        }
    }
    
    product = await Product.findByIdAndUpdate(req.params.id, {
        ...req.body,
        images: newImages
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product
    })
})

exports.deleteRecord = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.params.id)

    if (!product) { return next(new ErrorHandler('Product not found', 404)) }

    const images = product.images
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
    
    await product.remove()

    res.status(200).json({
        success: true,
        message: 'Product is deleted successfully',
    })
})