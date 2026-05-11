const express = require('express')
const router = express.Router()
const { createOrder, completeOrder } = require('../controllers/orderController')
const {isAuthenticated, authoriseRoles} = require('../middleware/auth')

router.post('/create/order', isAuthenticated, authoriseRoles('customer'), createOrder)
router.put('/complete/order/:orderId', isAuthenticated, authoriseRoles('manager', 'admin'), completeOrder)

module.exports = router;