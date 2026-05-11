require('dotenv').config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
const flash = require('express-flash')
const session = require('express-session')
const passport = require('passport')
const authRouter = require('./routes/auth')
const menuRouter = require('./routes/menu')
const tableRouter = require('./routes/table')
const reservationRouter = require('./routes/reservation')
const orderRouter = require('./routes/order')
const inventoryRouter = require('./routes/inventory')
const reportRouter = require('./routes/report')


db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to database'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs')
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 15 * 60 * 1000 }
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/', authRouter, menuRouter, tableRouter, reservationRouter, orderRouter, inventoryRouter, reportRouter)
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});