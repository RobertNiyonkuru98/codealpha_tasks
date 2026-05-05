const event = require('../models/events')
const attendees = require('../models/attendees')
const booking = require('../models/booking')
const users = require('../models/users')

exports.createEvent = async (req, res) => {
    try {
        const { title, description, date, location, isOnline, category, activity, organizer, minParticipants, maxParticipants, slots, tickets } = req.body
        const event = new event({
            title,
            description,
            date,
            location,
            isOnline,
            category,
            activity,
            organizer,
            minParticipants,
            maxParticipants,
            slots,
            tickets
        })
        await event.save()
        res.status(201).json(event)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.getEvent = async (req, res) => {
    try {
        const event = await event.findById(req.params.id)
        res.status(200).json(event)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
