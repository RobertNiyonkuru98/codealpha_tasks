require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
const ShortUrl = require('./models/shortUrl')

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database!'))

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false}))

app.get('/', async (req, res) => {
    const shortUrl = await ShortUrl.find()
    res.render('index', { shortUrl: shortUrl })
})

app.post('/shortUrls', async (req, res) => {
    await ShortUrl.create({ full: req.body.fullUrl })
    res.redirect('/')
})

app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
    if (shortUrl == null) return res.sendStatus(404)

    shortUrl.clicks++
    await shortUrl.save()
    res.redirect(shortUrl.full)
})

app.listen(PORT, () => console.log('Server is started on Port ' + PORT))