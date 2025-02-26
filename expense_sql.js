const sequelize = require('./util/database');

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json({ extended: false }));

const cors = require('cors');
// app.use(cors());

app.use(cors({
    origin: '*', // Allow all origins
    methods: ['GET', 'POST', 'DELETE', 'PUT'], // Allow specific methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allow specific headers
}));

const expenseRoute = require('./routes/expense_route');
app.use('/expense', expenseRoute);

sequelize
    .sync()
    .then(result => {
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch(err => {
        console.log(err);
    });