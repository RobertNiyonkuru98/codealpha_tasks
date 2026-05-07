const express = require('express')
const router = express.Router()

// Import controllers
const {
    dashboard,
    getAllEvents,
    createEventPage,
    createEvent,
    registerEventPage,
    registerEvent
} = require('../controllers/eventController');

// ---- Middleware ----
// If the user is NOT logged in, redirect them to /register
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next() // They are logged in — let them through
    }
    res.redirect('/') // Not logged in — send them away
}

// ---- Routes ----
router.get('/home', checkAuthenticated, dashboard)
router.get('/events', checkAuthenticated, getAllEvents)

router.get('/event/create', checkAuthenticated, createEventPage)
router.post('/event/create', checkAuthenticated, createEvent)

router.get('/event/:id/register', checkAuthenticated, registerEventPage)
router.post('/event/:id/register', checkAuthenticated, registerEvent)

// ---- Logout ----
router.post('/logout', (req, res) => {
    req.logout(err => {
        if (err) return res.status(500).send('Error logging out')
        res.redirect('/')
    })
})

module.exports = router