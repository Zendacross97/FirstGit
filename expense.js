const express = require('express');
const db = require('./util/db-connection');
const cors = require('cors');
const userRoute = require('./routes/userRoutes');
const expenseRoute = require('./routes/expense_route');
const userModel = require('./models/userModel');
const expenseModel = require('./models/expense_model');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/user', userRoute);
app.use('/expense', expenseRoute);

userModel.hasMany(expenseModel);
expenseModel.belongsTo(userModel);

db.sync({force: false})
.then(() => {
    app.listen(3000, () => {
        console.log("Server is running on http://localhost:3000");
    });
})
.catch((err) => {
    console.log(err);
});