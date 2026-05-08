const mongoose = require('mongoose')

const reservationSchema = new mongoose.Schema({
    reservationId: {
        type: Number,
        required: true,
        default: 0,
    }, customerName: {
        type: String,
        required: true,
        default: "",
    }, phone: {
        type: String,
        required: true,
        default: "",
    }, email: {
        type: String,
        required: true,
        default: "",
    }, tableId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Table',
        required: true,
    }, reservationDate: {
        type: Date,
        required: true,
        default: Date.now(),
    }, guestCount: {
        type: Number,
        required: true,
        default: 0,
    }, status: {
        type: String,
        required: true,
        enum: ['confirmed', 'pending', 'cancelled'],
        default: "pending",
    }
})