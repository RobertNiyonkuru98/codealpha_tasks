const Order = require('../models/orders.js')
const Table = require('../models/tables.js')
const MenuItem = require('../models/menuItems.js')
const Inventory = require('../models/inventories.js')


exports.createOrder = async (req, res) => {
    try {
        const { tableId, itemIds } = req.body;
        const menuItems = await MenuItem.find({_id: {$in: itemIds}})
        const totalAmount = menuItems.reduce((sum, item) => sum + item.price, 0);

        for (const menuItem of menuItems) {
            for (const ingredientName of menuItem.ingredients) {
                await Inventory.findOneAndUpdate({itemName: ingredientName}, {$inc: {quantity: -1}})
            }
        }

        const newOrder = await Order.create({
            tableId,
            items: itemIds,
            totalAmount,
            status: 'pending',
            paymentStatus: 'unpaid'
        })
        await newOrder.save();

        await Table.findByIdAndUpdate(tableId, {status:'occupied'})

        res.status(201).json(newOrder)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
