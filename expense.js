const express = require('express');
const db = require('./util/db-connection');
const cors = require('cors');
const expenseRoute = require('./routes/expense_route');
const expenseModel = require('./models/expense_model');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/expense', expenseRoute);

db.sync()
.then(() => {
    app.listen(3000, () => {
        console.log("Server is running on http://localhost:3000");
    });
})
.catch((err) => {
    console.log(err);
});