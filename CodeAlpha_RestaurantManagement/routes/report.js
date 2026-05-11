const express = require('express')
const router = express.Router()
const {getDailySalesReport, getWeeklySalesReport} = require('../controllers/reportController')
const {isAuthenticated, authoriseRoles} = require('../middleware/auth')

router.get('/daily-sales', isAuthenticated, authoriseRoles('manager', 'admin'), getDailySalesReport)
router.get('/weekly-sales', isAuthenticated, authoriseRoles('manager', 'admin'), getWeeklySalesReport)

module.exports = router;