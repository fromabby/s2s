const About = require('../models/about')
const Banner = require('../models/banner')
const Donation = require('../models/donation')
const Registration = require('../models/registration')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const cloudinary = require('cloudinary').v2

//*for about us content
exports.createAbout = catchAsyncErrors(async (req, res, next) => {
    const about = await About.create(req.body)

    res.status(201).json({
        success: true,
        message: "New about added!",
        about
    })
})

exports.getAllAbouts = catchAsyncErrors(async (req, res, next) => {
    const abouts = await About.find()

    res.status(200).json({
        success: true,
        abouts
    })
})

exports.getSingleAbout = catchAsyncErrors(async (req, res, next) => {
    const about = await About.findById(req.params.id)

    if (!about) { return next(new ErrorHandler('About not found', 404)) }

    res.status(200).json({
        success: true,
        about
    })
})

exports.updateAbout = catchAsyncErrors(async (req, res, next) => {
    let about = await About.findById(req.params.id)

    if (!about) { return next(new ErrorHandler('About not found', 404)) }

    about = await About.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        about,
        message: "Content updated"
    })
})

exports.deleteAbout = catchAsyncErrors(async (req, res, next) => {
    const about = await About.findById(req.params.id)

    if (!about) { return next(new ErrorHandler('About not found', 404)) }

    await about.remove()

    res.status(200).json({
        success: true,
        message: 'About is deleted successfully',
    })
})

//*for banner content
exports.createBanner = catchAsyncErrors(async (req, res, next) => {
    const banner = await Banner.create({ image: req.files })

    res.status(201).json({
        success: true,
        message: "New banner added!",
        banner
    })
})

exports.getAllBanners = catchAsyncErrors(async (req, res, next) => {
    const banners = await Banner.find()

    res.status(200).json({
        success: true,
        banners
    })
})

exports.getSingleBanner = catchAsyncErrors(async (req, res, next) => {
    const banner = await Banner.findById(req.params.id)

    if (!banner) { return next(new ErrorHandler('Banner not found', 404)) }

    res.status(200).json({
        success: true,
        banner
    })
})

exports.updateBanner = catchAsyncErrors(async (req, res, next) => {
    let banner = await Banner.findById(req.params.id)

    if (!banner) { return next(new ErrorHandler('Banner not found', 404)) }

    let image = req.files

    const oldImage = banner.image
    const length = oldImage && oldImage.length
    let ids = []

    for (let i = 0; i < length; i++) {
        ids.push(oldImage[i].filename)
    }

    if (image == null || image == '') {
        image = banner.image
    } else {
        if (ids.length != 0) {
            for (let x = 0; x < ids.length; x++) {
                cloudinary.uploader.destroy(ids[x],
                    { resource_type: 'raw' })
            }
        }
    }

    banner = await Banner.findByIdAndUpdate(req.params.id, { image }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        banner,
        message: "Content updated"
    })
})

exports.deleteBanner = catchAsyncErrors(async (req, res, next) => {
    const banner = await Banner.findById(req.params.id)

    if (!banner) { return next(new ErrorHandler('Banner not found', 404)) }

    const image = banner.image
    const length = image.length
    let ids = []

    for (let i = 0; i < length; i++) {
        ids.push(image[i].filename)
    }

    if (ids.length != 0) {
        for (let x = 0; x < ids.length; x++) {
            cloudinary.uploader.destroy(ids[x],
                { resource_type: 'raw' })
        }
    }

    await banner.remove()

    res.status(200).json({
        success: true,
        message: 'Banner is deleted successfully',
    })
})

//*for donation content
exports.createDonation = catchAsyncErrors(async (req, res, next) => {
    const donation = await Donation.create({ ...req.body, account_details: {
        account_name: req.body.account_name,
        account_number: req.body.account_number
    }, qr_code: req.files })

    res.status(201).json({
        success: true,
        message: "New donation added!",
        donation
    })
})

exports.getAllDonations = catchAsyncErrors(async (req, res, next) => {
    const donations = await Donation.find()
 
    res.status(200).json({
        success: true,
        donations
    })
})

exports.getSingleDonation = catchAsyncErrors(async (req, res, next) => {
    const donation = await Donation.findById(req.params.id)

    if (!donation) { return next(new ErrorHandler('Donation not found', 404)) }

    res.status(200).json({
        success: true,
        donation
    })
})

exports.updateDonation = catchAsyncErrors(async (req, res, next) => {
    let donation = await Donation.findById(req.params.id)

    if (!donation) { return next(new ErrorHandler('Donation not found', 404)) }

    let qr_code = req.files

    const oldImage = donation.qr_code
    const length = oldImage && oldImage.length
    let ids = []

    for (let i = 0; i < length; i++) {
        ids.push(oldImage[i].filename)
    }

    if (qr_code == null || qr_code == '') {
        qr_code = donation.qr_code
    } else {
        if (ids.length != 0) {
            for (let x = 0; x < ids.length; x++) {
                cloudinary.uploader.destroy(ids[x],
                    { resource_type: 'raw' })
            }
        }
    }

    donation = await Donation.findByIdAndUpdate(req.params.id, { ...req.body, account_details: {
        account_name: req.body.account_name,
        account_number: req.body.account_number
    }, qr_code }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        donation,
        message: "Content updated"
    })
})

exports.deleteDonation = catchAsyncErrors(async (req, res, next) => {
    const donation = await Donation.findById(req.params.id)

    if (!donation) { return next(new ErrorHandler('Donation not found', 404)) }

    const qr_code = donation.qr_code
    const length = qr_code.length
    let ids = []

    for (let i = 0; i < length; i++) {
        ids.push(qr_code[i].filename)
    }

    if (ids.length != 0) {
        for (let x = 0; x < ids.length; x++) {
            cloudinary.uploader.destroy(ids[x],
                { resource_type: 'raw' })
        }
    }

    await donation.remove()

    res.status(200).json({
        success: true,
        message: 'Donation is deleted successfully',
    })
})

//*for registration content
exports.createRegistration = catchAsyncErrors(async (req, res, next) => {  
    if(Number(req.body.registrationType) !== 1 && Number(req.body.registrationType) !== 2) {
        return next(new ErrorHandler('Invalid registration type', 404))
    }

    const registration = await Registration.create(req.body)

    res.status(201).json({
        success: true,
        message: "New registration added!",
        registration
    })
})

exports.getAllRegistrations = catchAsyncErrors(async (req, res, next) => {
    const registrations = await Registration.find()

    res.status(200).json({
        success: true,
        registrations
    })
})

exports.getSingleRegistration = catchAsyncErrors(async (req, res, next) => {
    const registration = await Registration.findById(req.params.id)

    if (!registration) { return next(new ErrorHandler('Registration not found', 404)) }

    res.status(200).json({
        success: true,
        registration
    })
})

exports.updateRegistration = catchAsyncErrors(async (req, res, next) => {
    let registration = await Registration.findById(req.params.id)

    if (!registration) { return next(new ErrorHandler('Registration not found', 404)) }

    if(Number(req.body.registrationType) !== 1 && Number(req.body.registrationType) !== 2) {
        return next(new ErrorHandler('Invalid registration type', 404))
    }
    
    registration = await Registration.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        registration,
        message: "Content updated"
    })
})

exports.deleteRegistration = catchAsyncErrors(async (req, res, next) => {
    const registration = await Registration.findById(req.params.id)

    if (!registration) { return next(new ErrorHandler('Registration not found', 404)) }

    await registration.remove()

    res.status(200).json({
        success: true,
        message: 'Registration is deleted successfully',
    })
})