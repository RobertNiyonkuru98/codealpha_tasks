const Order = require('../models/orders')

exports.getDailySalesReport = async (req, res) => {
    try {
        const startOfDay = new Date()
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date()
        endOfDay.setHours(23, 59, 59, 999);

        const dailyOrders = await Order.find({
            createdAt: { $gte: startOfDay, $lte: endOfDay },
            paymentStatus: 'paid'
        });

        const totalSales = dailyOrders.reduce((sum, order) => sum + order.totalAmount, 0);

        res.render('reports', {
            reportType: 'Daily Sales Report',
            date: startOfDay.toDateString(),
            orderCount: dailyOrders.length,
            totalSales: totalSales,
            orders: dailyOrders
        })
    } catch (error) {
        res.status(500).render('reports', {
            reportType: 'Daily Sales Report',
            date: new Date().toDateString(),
            orderCount: 0, totalSales: 0, orders: [],
            message: 'Error generating daily report: ' + error.message
        })
    }
}

exports.getWeeklySalesReport = async (req, res) => {
    try {
        const startOfWeek = new Date()
        startOfWeek.setDate(startOfWeek.getDate() - 7)
        startOfWeek.setHours(0, 0, 0, 0);
        const endOfWeek = new Date()
        endOfWeek.setHours(23, 59, 59, 999);

        const weeklyOrders = await Order.find({
            createdAt: { $gte: startOfWeek, $lte: endOfWeek },
            paymentStatus: 'paid'
        });

        const totalSales = weeklyOrders.reduce((sum, order) => sum + order.totalAmount, 0);

        res.render('reports', {
            reportType: 'Weekly Sales Report',
            date: `${startOfWeek.toDateString()} - ${endOfWeek.toDateString()}`,
            orderCount: weeklyOrders.length,
            totalSales: totalSales,
            orders: weeklyOrders
        })
    } catch (error) {
        res.status(500).render('reports', {
            reportType: 'Weekly Sales Report',
            date: new Date().toDateString(),
            orderCount: 0, totalSales: 0, orders: [],
            message: 'Error generating weekly report: ' + error.message
        })
    }
}