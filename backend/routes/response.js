const express = require('express')
const router = express.Router()

const { isVerified, isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')
const response = require('../controllers/responseController')

router.route('/responses').get(response.getAllResponses)
router.route('/responses/:status').get(response.getAllResponses)
router.route('/:id/responses/:status').get(response.getAllPostResponses)
router.route('/responses/:id').get(response.getSingleResponse)

router.route('/responses/:post_id').post(isVerified, response.createResponse)
router.route('/responses/:id').put(isAuthenticatedUser, authorizeRoles('superadmin', 'admin'), response.updateResponse)
router.route('/responses/viewer/:id').delete(isVerified, response.deleteViewerResponse)
router.route('/responses/admin/:id').delete(isAuthenticatedUser, authorizeRoles('superadmin', 'admin'), response.deleteAdminResponse)

module.exports = router