const express = require('express')
const router = express.Router()
const {checkAuthenticated} = require('../middleware/auth')

const { getUserBookings, cancelBooking } = require('../controllers/bookingController')

router.get('/bookings', checkAuthenticated, getUserBookings)
router.post('/bookings/cancel/:id', checkAuthenticated, cancelBooking)

module.exports = router