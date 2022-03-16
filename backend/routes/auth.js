const express = require('express')
const router = express.Router()

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')
const auth = require('../controllers/authController')

router.route('/login').post(auth.login)
router.route('/logout').get(auth.logout)
router.route('/update/password').put(isAuthenticatedUser, auth.updatePassword)
router.route('/password/forgot').post(auth.forgotPassword)
router.route('/password/reset/:token').put(auth.resetPassword)

router.route('/me/profile').get(isAuthenticatedUser, auth.getMyProfile)
router.route('/me/update').put(isAuthenticatedUser, auth.updateMyProfile)

router.route('/admin/user/new').post(isAuthenticatedUser, authorizeRoles('superadmin'), auth.register)
router.route('/admin/user/:id').get(isAuthenticatedUser, authorizeRoles('superadmin'), auth.getUser)
router.route('/admin/users').get(isAuthenticatedUser, authorizeRoles('superadmin'), auth.getUsers)
router.route('/admin/user/:id').put(isAuthenticatedUser, authorizeRoles('superadmin'), auth.updateUser)
router.route('/admin/user/:id').delete(isAuthenticatedUser, authorizeRoles('superadmin'), auth.deleteUser)


module.exports = router