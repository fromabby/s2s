const express = require('express')
const router = express.Router()

const user = require('../controllers/userController')

router.route('/viewer/verify').get(user.verifyUserEmail)
router.route('/viewer/create').post(user.saveUser)

module.exports = router