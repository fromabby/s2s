const express = require('express')
const router = express.Router()

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')
const response = require('../controllers/responseController')

router.route('/responses').get(response.getAllResponses)
router.route('/:id/responses').get(response.getAllPostResponses)
router.route('/responses/:id').get(response.getSingleResponse)

router.route('/responses/:post_id').post(isAuthenticatedUser, response.createResponse)
router.route('/responses/:id').put(isAuthenticatedUser, response.updateResponse)
router.route('/responses/:id').delete(isAuthenticatedUser, response.deleteResponse)

module.exports = router