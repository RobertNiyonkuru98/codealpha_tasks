// Event List Table
const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    eventId: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    isOnline: {
        type: Boolean,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    activity: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    organizer: {
        type: String,
        required: true
    },
    minParticipants: {
        type: Number,
        required: true
    },
    maxParticipants: {
        type: Number,
        required: true
    },
    slots: {
        type: Number,
        required: true
    },
    tickets:{
        type: [
            {
                id: {
                    type: String,
                    required: true
                },
                name: {
                    type: String,
                    required: true
                },
                price: {
                    type: Number,
                    required: true
                },
                currency: {
                    type: String,
                    required: true
                }
            }
        ]
    },
    attendees: {
        type: [
            {
                type: String,
                required: true
            }
        ]
    },
    comments: {
        type: [
            {
                type: String,
                required: true
            }
        ]
    }
})

module.exports = mongoose.model("Event", eventSchema)