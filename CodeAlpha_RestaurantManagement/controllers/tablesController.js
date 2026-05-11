const Table = require('../models/tables.js')

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

exports.getAllTables = async (req, res) => {
    try {
        const tables = await Table.find();
        res.status(200).json({message: 'Tables fetched successfully', tables})
    } catch (error) {
        res.status(500).json({message: 'Error fetching tables', error})
    }
}