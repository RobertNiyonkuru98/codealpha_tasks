const Order = require('../models/orders.js')
const Table = require('../models/tables.js')
const MenuItem = require('../models/menuItems.js')
const Inventory = require('../models/inventories.js')

exports.getOrdersPage = async (req, res) => {
    try {
        const orders = await Order.find().populate('tableId').populate('items')
        res.render('orders', { orders, message: null })
    } catch (error) {
        res.status(500).render('orders', { orders: [], message: 'Error loading orders.' })
    }
}

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

        await Table.findByIdAndUpdate(tableId, {status: 'occupied'})

        res.status(201).json({ message: 'Order placed successfully!', order: newOrder })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

exports.completeOrder = async (req, res) => {
    try {
        const {orderId} = req.params;
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({message: 'Order not found'})
        }

        order.status = 'completed';
        order.paymentStatus = 'paid';
        await order.save();
        await Table.findByIdAndUpdate(order.tableId, {status: 'available'})
        res.status(200).json({message: 'Order completed successfully'})
    } catch (error) {
        res.status(500).json({message: 'Error completing order', error: error.message})
    }
}
