const Inventory = require('../models/inventories.js')

exports.getInventoryPage = async (req, res) => {
    try {
        const allItems = await Inventory.find();
        res.render('inventory', { inventory: allItems, message: null })
    } catch (error) {
        console.log(error)
        res.status(500).render('inventory', { inventory: [], message: 'Error loading inventory.' })
    }
}

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

exports.addInventoryItem = async (req, res) => {
    try {
        const { itemName, quantity, minimumLevel, unit } = req.body;
        await Inventory.create({ itemName, quantity, minimumLevel, unit })
        res.status(201).json({ message: 'Item added to inventory' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.getLowStockAlerts = async (req, res) => {
    try {
        const lowStockItems = await Inventory.find({$expr: {$lt: ["$quantity", "$minimumLevel"]}})
        res.render('lowstock', { lowStockItems })
    } catch (error) {
        console.log(error)
        res.status(500).render('lowstock', { lowStockItems: [], message: 'Error loading low stock alerts.' })
    }
}