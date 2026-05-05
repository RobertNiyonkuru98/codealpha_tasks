const mongoose = require('mongoose')
const bookingSchema = new mongoose.Schema({
    attendee: {
        type: String,
        required: true
    },
    event: {
        type: String,
        required: true
    },
    ticket: {
        type: String,
        required: true
    },
    payment: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("Booking", bookingSchema)