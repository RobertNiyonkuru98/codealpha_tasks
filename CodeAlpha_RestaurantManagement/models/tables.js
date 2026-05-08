const mongoose = require('mongoose')

const tableSchema = new mongoose.Schema({
    tableId: {
        type: Number,
        required: true,
        default: 0,
    }, tableNumber: {
        type: String,
        required: true,
        default: "",
    }, capacity: {
        type: Number,
        required: true,
        default: 0,
    }, status: {
        type: String,
        required: true,
        enum: ['available', 'occupied', 'reserved', 'maintenance'],
        default: "available",
    }, location: {
        type: String,
        required: true,
        default: "",
    }
})

module.exports = new mongoose.model('Table', tableSchema)