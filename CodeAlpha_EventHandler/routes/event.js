const express = require('express')
const router = express.Router()

// Import controllers
const {
    getAllEvents,
    createEventPage,
    createEvent,
    registerEventPage,
    registerEvent
} = require('../controllers/eventController');


router.get('/', getAllEvents) // Loading the page with All the events

router.get('/event/create', createEventPage) // Loading the page with the form to create a new event

router.post('/event/create', createEvent) // Submitting the form to create a new event

router.get('/event/:id/register', registerEventPage) // Loading the page with the form to register for an event

router.post('/event/:id/register', registerEvent) // Submitting the form to register for an event

module.exports = router