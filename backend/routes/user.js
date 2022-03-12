const express = require('express')
const router = express.Router()

const user = require('../controllers/userController')

router.route('/viewer/verify').post(user.verifyUserEmail)
router.route('/viewer/create/:token').post(user.saveUser)

module.exports = router