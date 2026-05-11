const express = require('express')
const router = express.Router()
const { createTable, getAllTables } = require('../controllers/tableController')

router.get('/get/tables', getAllTables)
router.post('/add/table', createTable)

module.exports = router;