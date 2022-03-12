const express = require('express')
const router = express.Router()

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')
const post = require('../controllers/postController')

router.route('/posts').get(post.getAllPosts)
router.route('/posts/:id').get(post.getSinglePost)

router.route('/posts').post(isAuthenticatedUser, authorizeRoles('superadmin', 'admin'), post.createPost)
router.route('/posts/:id').put(isAuthenticatedUser, authorizeRoles('superadmin', 'admin'), post.updatePost)
router.route('/posts/:id').delete(isAuthenticatedUser, authorizeRoles('superadmin', 'admin'), post.deletePost)

module.exports = router