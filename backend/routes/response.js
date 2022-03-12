const express = require('express')
const router = express.Router()

const { isVerified, authorizeRoles } = require('../middlewares/auth')
const response = require('../controllers/responseController')

router.route('/responses').get(response.getAllResponses)
router.route('/:id/responses').get(response.getAllPostResponses)
router.route('/responses/:id').get(response.getSingleResponse)

router.route('/responses/:post_id').post(isVerified, response.createResponse)
router.route('/responses/:id').put(isVerified, response.updateResponse)
router.route('/responses/:id').delete(isVerified, response.deleteResponse)

module.exports = router