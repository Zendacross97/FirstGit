const database = require('./util/db-connection');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const paymentRoute = require('./routes/paymentRoute');
const orderModel = require('./models/orderModel');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/', paymentRoute);

database.sync({force: false})
.then(() => {
    app.listen(3000, () => {
        console.log('Server is running on http://localhost:3000');
    });
}) 
.catch(err => {
    console.log(err);
});