const express = require('express')
const router = express.Router()
const Event = require('../models/events')

router.get('/', (req, res) => {
    try {
        res.render('index')
    } catch (error) {
        console.log(error)
    }
})

router.post('/event', (req, res) => {

})

module.exports = router
