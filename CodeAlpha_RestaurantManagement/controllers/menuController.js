const MenuItem = require('../models/menuItems.js')

exports.addMenuItem = async (req, res) => {
    try {
        const {name, price, description,category, ingredients} = req.body;
        await MenuItem.create({
            name,
            price,
            description,
            category,
            ingredients,
        })
        res.status(201).json({message:"Item added successfully"})
    } catch (err) {
        res.status(500).json({message: "Error adding menu item", error: err})
    }
}

exports.getMenu = async (req, res) => {
    try {
        const items = (await MenuItem.find()).sort({category: 1});
        res.status(200).json({message:"Menu items",menuItems: items})
    } catch (error) {
        res.status(500).json({message: "Error fetching menu"})
    }
}