const Order = require('../models/Order')

exports.getDailySalesReport = async (req, res) => {
    try {
        const startOfDay = new Date()
        startOfDay.setHours(0,0,0,0);
        const endOfDay = new Date()
        endOfDay.setHours(23,59,59,999);
        const dailyOrders = await Order.find({
            createAt: {$gte: startOfDay, $lte: endOfDay},
            paymentStatus: 'paid'
        });

        const totalSales = dailyOrders.reduce((sum, order) => sum + order.totalAmount, 0);
        res.status(200).json({
            date: startOfDay.toDateString(),
            orderCount: dailyOrders.length,
            totalSales: totalSales,
            orders: dailyOrders
        })
    } catch (error) {
        res.status(500).json({ message:"Error generating daily report", error: error.message })
    }
}

exports.getWeeklySalesReport = async (req, res) => {
    try {
        const startOfWeek = new Date()
        startOfWeek.setHours(0,0,0,0);
        const endOfWeek = new Date()
        endOfWeek.setHours(23,59,59,999);
        const weeklyOrders = await Order.find({
            createAt: {$gte: startOfWeek, $lte: endOfWeek},
            paymentStatus: 'paid'
        });

        const totalSales = weeklyOrders.reduce((sum, order) => sum + order.totalAmount, 0);
        res.status(200).json({
            date: startOfWeek.toDateString(),
            orderCount: weeklyOrders.length,
            totalSales: totalSales,
            orders: weeklyOrders
        })
    } catch (error) {
        res.status(500).json({ message:"Error generating weekly report", error: error.message })
    }
}