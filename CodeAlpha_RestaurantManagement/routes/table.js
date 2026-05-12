const express = require('express')
const router = express.Router()
const { getAllTables, createTable } = require('../controllers/tablesController')
const { isAuthenticated, authoriseRoles } = require('../middleware/auth')

router.get('/', isAuthenticated, getAllTables)

router.post('/add', isAuthenticated, authoriseRoles('manager', 'admin'), createTable)

module.exports = router;