// Users table
const mongoose = require('mongoose')

const attendeeSchema = new mongoose.Schema({
    attendeeId: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    bookings: {
        type: [String]
    },
})

module.exports = mongoose.model('Attendee', attendeeSchema)