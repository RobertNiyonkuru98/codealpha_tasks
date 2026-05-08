require('dotenv').config();
const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection

db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to database'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs')

app.use('/', menuRouter)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});