const express = require('express')
const router = express.Router()
const storage = require('../config/websiteContentImages')
const path = require('path')
const multer = require('multer')

const fileMimeTypes = [
    'image/jpeg',
    'image/png',
    'images/jpg',
    'application/vnd.ms-excel',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/pdf',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation'
]

const fileUpload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        const ext = path.extname(file.originalname)
        if (!fileMimeTypes.includes(file.mimetype)) {
            return cb(new Error('File type not supported'))
        } else {
            cb(null, true)
        }
    }
})

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')
const content = require('../controllers/contentController')

//*about us
router.route('/abouts').get(content.getAllAbouts)
router.route('/admin/about/:id').get(isAuthenticatedUser, authorizeRoles('superadmin', 'admin'), content.getSingleAbout)
router.route('/admin/about/new').post(isAuthenticatedUser, authorizeRoles('superadmin', 'admin'), content.createAbout)
router.route('/admin/about/:id').put(isAuthenticatedUser, authorizeRoles('superadmin', 'admin'), content.updateAbout)
router.route('/admin/about/:id').delete(isAuthenticatedUser, authorizeRoles('superadmin', 'admin'), content.deleteAbout)

//*banner
router.route('/banners').get(content.getAllBanners)
router.route('/admin/banner/:id').get(isAuthenticatedUser, authorizeRoles('superadmin', 'admin'), content.getSingleBanner)
router.route('/admin/banner/new').post(isAuthenticatedUser, fileUpload.array('image'), authorizeRoles('superadmin', 'admin'), content.createBanner)
router.route('/admin/banner/:id').put(isAuthenticatedUser, fileUpload.array('image'), authorizeRoles('superadmin', 'admin'), content.updateBanner)
router.route('/admin/banner/:id').delete(isAuthenticatedUser, authorizeRoles('superadmin', 'admin'), content.deleteBanner)

//*donation
router.route('/donations').get(content.getAllDonations)
router.route('/admin/donation/:id').get(isAuthenticatedUser,authorizeRoles('superadmin', 'admin'), content.getSingleDonation)
router.route('/admin/donation/new').post(isAuthenticatedUser, fileUpload.array('qr_code'), authorizeRoles('superadmin', 'admin'), content.createDonation)
router.route('/admin/donation/:id').put(isAuthenticatedUser, fileUpload.array('qr_code'), authorizeRoles('superadmin', 'admin'), content.updateDonation)
router.route('/admin/donation/:id').delete(isAuthenticatedUser, authorizeRoles('superadmin', 'admin'), content.deleteDonation)

//*registration
router.route('/registrations').get(content.getAllRegistrations)
router.route('/admin/registration/:id').get(isAuthenticatedUser,authorizeRoles('superadmin', 'admin'), content.getSingleRegistration)
router.route('/admin/registration/new').post(isAuthenticatedUser, authorizeRoles('superadmin', 'admin'), content.createRegistration)
router.route('/admin/registration/:id').put(isAuthenticatedUser, authorizeRoles('superadmin', 'admin'), content.updateRegistration)
router.route('/admin/registration/:id').delete(isAuthenticatedUser, authorizeRoles('superadmin', 'admin'), content.deleteRegistration)

module.exports = router