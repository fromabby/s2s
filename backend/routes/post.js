const express = require('express')
const router = express.Router()
const storage = require('../config/postsImages')
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
const post = require('../controllers/postController')

router.route('/posts').get(post.getAllPosts)
router.route('/posts/:id').get(post.getSinglePost)

router.route('/posts').post(isAuthenticatedUser, fileUpload.array('images'), authorizeRoles('superadmin', 'admin'), post.createPost)
router.route('/posts/:id').put(isAuthenticatedUser, fileUpload.array('images'), authorizeRoles('superadmin', 'admin'), post.updatePost)
router.route('/posts/:id').delete(isAuthenticatedUser, authorizeRoles('superadmin', 'admin'), post.deletePost)

module.exports = router