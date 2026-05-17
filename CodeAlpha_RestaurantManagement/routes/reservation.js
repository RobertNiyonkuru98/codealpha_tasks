const express = require('express')
const router = express.Router()
const {createReservation} = require('../controllers/reservationController')
const {isAuthenticated, authoriseRoles} = require('../middleware/auth')

router.get('/', isAuthenticated, (req, res) => res.render('reservation', { query: req.query }))
router.post('/create', createReservation)

module.exports = router
