const express = require('express')
const router = express.Router()

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')
const record = require('../controllers/recordController')

router.route('/records').get(record.getAllRecords)
router.route('/record/:id').get(record.getSingleRecord)

router.route('/admin/record/new').post(isAuthenticatedUser, authorizeRoles('superadmin', 'admin'), record.createRecord)
router.route('/admin/record/:id').put(isAuthenticatedUser, authorizeRoles('superadmin', 'admin'), record.updateRecord)
router.route('/admin/record/:id').delete(isAuthenticatedUser, authorizeRoles('superadmin', 'admin'), record.deleteRecord)

module.exports = router