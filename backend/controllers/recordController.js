const Record = require('../models/record')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')

exports.createRecord = catchAsyncErrors(async (req, res, next) => {
    const record = await Record.create(req.body)

    res.status(201).json({
        success: true,
        message: "New record added!",
        record
    })
})

exports.getAllRecords = catchAsyncErrors(async (req, res, next) => {
    const records = await Record.find()
    
    res.status(200).json({
        success: true,
        recordCount,
        records
    })
})

exports.getSingleRecord = catchAsyncErrors(async (req, res, next) => {
    const record = await Record.findById(req.params.id)

    if (!record) { return next(new ErrorHandler('Record not found', 404)) }

    res.status(200).json({
        success: true,
        record
    })
})

exports.updateRecord = catchAsyncErrors(async (req, res, next) => {
    let record = await Record.findById(req.params.id)

    if (!record) { return next(new ErrorHandler('Record not found', 404)) }

    record = await Record.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        record
    })
})

exports.deleteRecord = catchAsyncErrors(async (req, res, next) => {
    const record = await Record.findById(req.params.id)

    if (!record) { return next(new ErrorHandler('Record not found', 404)) }

    await record.remove()

    res.status(200).json({
        success: true,
        message: 'Record is deleted successfully',
    })
})