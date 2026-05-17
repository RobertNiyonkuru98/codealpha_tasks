const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userId: {type: Number, required: true},
    name: {type: String, required: true},
    email: {type: String, required: true},
    mobile_number: {type: Number, required: true},
    gender: {type: String, required: true},
    role: {type: String, enum:['admin', 'staff', 'customer'],required: true},
    password: {type: String, required: true}
})

module.exports = mongoose.model('Users', userSchema)