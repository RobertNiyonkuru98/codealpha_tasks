const express = require('express')
const router = express.Router()
const { getOrdersPage, createOrder, completeOrder } = require('../controllers/orderController')
const { isAuthenticated, authoriseRoles } = require('../middleware/auth')

router.get('/new', isAuthenticated, authoriseRoles('customer'), (req, res) => res.render('orderForm'))

router.get('/', isAuthenticated, authoriseRoles('manager', 'admin'), getOrdersPage)

router.post('/create', isAuthenticated, authoriseRoles('customer'), createOrder)

router.put('/:orderId/complete', isAuthenticated, authoriseRoles('manager', 'admin'), completeOrder)

module.exports = router;