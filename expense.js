const express = require('express');
const db = require('./util/db-connection');
const cors = require('cors');
const userRoute = require('./routes/userRoutes');
const userModel = require('./models/userModel');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/user', userRoute);

db.sync()
.then(() => {
    app.listen(3000, () => {
        console.log("Server is running on http://localhost:3000");
    });
})
.catch((err) => {
    console.log(err);
});