const user = require('../models/users')

exports.registerUser = async (req, res) => {
    try {
        const { name, email, phone, gender, password } = req.body
        const user = new user({
            name,
            email,
            phone,
            gender,
            password
        })
        await user.save()
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}