const express = require('express')
const router = express.Router()

// Import controllers
const {
    dashboard,
    getAllEvents,
    createEventPage,
    createEvent,
    registerEventPage,
    registerEvent,
    getEventAttendees
} = require('../controllers/eventController');

const {checkAuthenticated, checkAdmin} = require('../middleware/auth')

// ---- Routes ----
router.get('/home', dashboard) // Guest can see dashboard
router.get('/events', checkAuthenticated, getAllEvents)

router.get('/event/create', checkAuthenticated, checkAdmin, createEventPage)
router.post('/event/create', checkAuthenticated, checkAdmin, createEvent)

router.get('/event/:id/register', checkAuthenticated, registerEventPage)
router.post('/event/:id/register', checkAuthenticated, registerEvent)

router.get('/event/:id/attendees', checkAuthenticated, checkAdmin, getEventAttendees)

// ---- Logout ----
router.post('/logout', (req, res) => {
    req.logout(err => {
        if (err) return res.status(500).send('Error logging out')
        res.redirect('/')
    })
})

module.exports = router