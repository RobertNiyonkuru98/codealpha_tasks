const express = require('express')
const router = express.Router()

const { register, registerUser, login, loginUser } = require('../controllers/authController')

router.get('/', register) // Loading the page with the form to register for an event
router.post('/', registerUser) // Submitting the form to register for an event

router.get('/login', login) // Loading the page with the form to login for an event
router.post('/login', loginUser) // Submitting the form to login for an event

module.exports = router