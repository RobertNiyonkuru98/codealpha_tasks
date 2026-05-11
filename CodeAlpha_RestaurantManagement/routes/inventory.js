const express = require('express')
const router = express.Router()
const {updateStock, getLowStockAlerts} = require('../controllers/inventoryController')
const {isAuthenticated, authoriseRoles} = require('../middleware/auth')

router.put('/update/stock', isAuthenticated, authoriseRoles('manager', 'admin'), updateStock)
router.get('/get/lowstock', isAuthenticated, authoriseRoles('manager', 'admin'), getLowStockAlerts)

module.exports = router;