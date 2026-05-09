const Users = require('../models/users')
const bcrypt = require('bcrypt')
const passport = require('passport')
const initializePassport = require('../config/passport-config')

initializePassport(passport, email => Users.findOne({email: email}), id => Users.findOne({userId: id}))

exports.register = async (req, res) => {
    try {
        res.render('register')
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.login = async (req, res) => {
    try {
        res.render('login')
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.registerUser = async (req, res) => {
    try {
        const userId = Math.floor(Math.random() * 100000)
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const existingUser = await Users.findOne({ email: req.body.email })
        if (existingUser) {
            return res.status(400).send('User already exists')
        }
        await Users.create({
            userId: userId,
            name: req.body.name,
            email: req.body.email,
            mobile_number: req.body.mobile_number,
            gender: req.body.gender,
            password: hashedPassword
        })
        console.log(`User ${req.body.name} with email ${req.body.email} has been registered successfully`)
        res.redirect('/login')
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.loginUser = passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login',
    failureFlash: true
})