const express = require('express')
const router = express.Router()
const { getMenu, addMenuItem, upload } = require('../controllers/menuController')
const { isAuthenticated, authoriseRoles } = require('../middleware/auth')

router.get('/', isAuthenticated, getMenu)

router.post('/add', isAuthenticated, authoriseRoles('manager', 'admin'), upload.single('image'), addMenuItem)

module.exports = router;