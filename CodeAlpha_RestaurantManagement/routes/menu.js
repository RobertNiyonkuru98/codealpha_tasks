const express = require('express')
const router = express.Router()
const {addMenuItem, getMenu} = require('../controllers/menuController')

router.post('/add/menu', addMenuItem)
router.get('/get/menu', getMenu)

module.exports = router;