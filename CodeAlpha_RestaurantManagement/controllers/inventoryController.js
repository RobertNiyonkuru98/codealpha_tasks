const Inventory = require('../models/inventories.js')

exports.updateStock = async (req, res) => {
    try {
        const {itemName, quantity} = req.body;
        const updatedItem = await Inventory.findOneAndUpdate({itemName: itemName}, {$inc: {quantity: quantity}}, {new: true})
        if (!updatedItem) {
            return res.status(404).json({message: 'Item not found'})
        }
        res.status(200).json({message: 'Stock updated successfully', inventory: updatedItem})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
    }
}

exports.getLowStockAlerts = async (req, res) => {
    try {
        const lowStockItems = await Inventory.find({$expr: {$lt: ["$quantity", "$minimumLevel"]}})

        res.status(200).json({message: 'Low Stock Alerts', inventory: lowStockItems})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
    }
}