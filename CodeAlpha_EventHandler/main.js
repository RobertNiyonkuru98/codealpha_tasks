require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
const eventRouter = require('./routes/event')
const authRouter = require('./routes/auth')

db.on('error', () => console.error(err))
db.once('open', () => console.log('Connected to Database'))

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use('/', eventRouter, authRouter)

app.listen(PORT, () => console.log('Server is started on port ' + PORT))