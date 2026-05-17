const express = require('express')
const router = express.Router()
const { getInventoryPage, updateStock, addInventoryItem, getLowStockAlerts } = require('../controllers/inventoryController')
const { isAuthenticated, authoriseRoles } = require('../middleware/auth')

router.get('/', isAuthenticated, authoriseRoles('manager', 'admin'), getInventoryPage)

router.get('/lowstock', isAuthenticated, authoriseRoles('manager', 'admin'), getLowStockAlerts)

router.post('/add', isAuthenticated, authoriseRoles('manager', 'admin'), addInventoryItem)

router.put('/update', isAuthenticated, authoriseRoles('manager', 'admin'), updateStock)

module.exports = router;