const MenuItem = require('../models/menuItems.js')
const multer = require('multer')
const path = require('path')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/menu/')
    },
    filename: (req, file, cb) => {
        const unique = Date.now() + '-' + Math.round(Math.random() * 1e9)
        cb(null, unique + path.extname(file.originalname))
    }
})
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowed = /jpeg|jpg|png|webp/
        const ext = allowed.test(path.extname(file.originalname).toLowerCase())
        if (ext) cb(null, true)
        else cb(new Error('Only image files are allowed (jpeg, jpg, png, webp)'))
    },
    limits: { fileSize: 5 * 1024 * 1024 }
})

exports.upload = upload


exports.getMenu = async (req, res) => {
    try {
        const menuItems = await MenuItem.find().sort({ category: 1 })
        res.render('menu', { menuItems })
    } catch (error) {
        res.status(500).render('menu', { menuItems: [], error: 'Error fetching menu: ' + error.message })
    }
}


exports.addMenuItem = async (req, res) => {
    try {
        const { name, price, description, category, ingredients, imageUrl } = req.body


        let finalImageUrl = imageUrl || ''
        if (req.file) {
            finalImageUrl = '/uploads/menu/' + req.file.filename
        }

        await MenuItem.create({
            name,
            price: parseFloat(price),
            description,
            category,
            ingredients: ingredients ? ingredients.split(',').map(i => i.trim()) : [],
            imageUrl: finalImageUrl,
        })

        res.status(201).json({ message: 'Menu item added successfully!' })
    } catch (err) {
        res.status(500).json({ message: 'Error adding menu item: ' + err.message })
    }
}