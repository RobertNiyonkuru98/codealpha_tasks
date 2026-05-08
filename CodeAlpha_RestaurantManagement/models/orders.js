const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    orderId: {
        type: Number,
        required: true,
        default: 0,
    }, tableId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Table',
        required: true,
    }, items: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Menu',
        required: true,
    }, totalAmount: {
        type: Number,
        required: true,
        default: 0.0,
    }, status: {
        type: String,
        required: true,
        default: "",
    }, paymentStatus: {
        type: String,
        required: true,
        default: "",
    }, createdAt: {
        type: Date,
        required: true,
        default: Date.now(),
    }
})

module.exports = mongoose.model('Order', orderSchema)