const mongoose = require('mongoose')
const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    status:{
        type: String,
        default: 'Confirmed',
    },
    bookedAt: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model("Booking", bookingSchema)