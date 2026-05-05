const booking = require('../models/booking')
const attendees = require('../models/attendees')
const events = require('../models/events')

exports.bookEvent = async (req, res) => {
    try {
        const { eventId, attendeeId } = req.body
        const event = await events.findById(eventId)
        const attendee = await attendees.findById(attendeeId)
        const booking = new booking({
            event: eventId,
            attendee: attendeeId
        })
        await booking.save()
        res.status(201).json(booking)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}