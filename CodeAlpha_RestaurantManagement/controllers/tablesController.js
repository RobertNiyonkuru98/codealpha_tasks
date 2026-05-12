const Table = require('../models/tables.js')

exports.getAllTables = async (req, res) => {
    try {
        const tables = await Table.find();
        res.render('tables', { tables, message: null })
    } catch (error) {
        res.status(500).render('tables', { tables: [], message: 'Error fetching tables.' })
    }
}

exports.createTable = async (req, res) => {
    try {
        const {tableNumber, capacity, location} = req.body;
        await Table.create({
            tableNumber,
            capacity,
            location,
            status: 'available',
        })
        res.status(201).json({message: "Table created successfully"})
    } catch (error) {
        res.status(500).json({message: "Error creating table", error: error})
    }
}