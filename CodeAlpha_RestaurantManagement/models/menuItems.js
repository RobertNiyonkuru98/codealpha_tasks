const mongoose = require('mongoose')

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
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
        type: Boolean,
        default: true,
    },
    ingredients: {
        type: [String],
        default: [],
    },
    imageUrl: {
        type: String,  // Stores either an uploaded file path or a web URL
        default: "",
    },
}, { timestamps: true })

module.exports = mongoose.model('Menu', menuSchema)