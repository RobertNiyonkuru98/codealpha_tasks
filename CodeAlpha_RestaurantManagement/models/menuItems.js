const mongoose = require('mongoose')

const menuSchema = new mongoose.Schema({
    menuId: {
        type: Number,
        required: true,
        default: 0,
    },
    name: {
        type: String,
        required: true,
        default: "",
    },
    description: {
        type: String,
        required: true,
        default: "",
    },
    price: {
        type: Number,
        required: true,
        default: 0.0,
    },
    category: {
        type: String,
        required: true,
        default: "",
    },
    availability: {
        type: String,
        required: true,
        default: "",
    },
    ingredients: {
        type: [String],
        required: true,
        default: [],
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now(),
    },
})

module.exports = mongoose.model('Menu', menuSchema)