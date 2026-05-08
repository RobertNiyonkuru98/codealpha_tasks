const mongoose = require('mongoose')

const inventorySchema = new mongoose.Schema({
    inventoryId: {
        type: Number,
        required: true,
        default: 0,
    }, itemName: {
        type: String,
        required: true,
        default: "",
    }, quantity: {
        type: Number,
        required: true,
        default: 0,
    }, unit: {
        type: String,
        required: true,
        default: "",
    }, minimumLevel: {
        type: Number,
        required: true,
        default: 0,
    }, supplier: {
        type: String,
        required: true,
        default: "",
    }, lastRestocked: {
        type: Date,
        required: true,
        default: Date.now(),
    },
})

module.exports = mongoose.model('Inventory', inventorySchema)