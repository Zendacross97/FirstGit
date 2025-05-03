const database = require('./util/db-connection');
const express = require('express');
const cors = require('cors');
const attendanceRoute = require('./routes/attendanceRoute');
const attendanceModel = require('./models/attendanceModel');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/attendance', attendanceRoute);

database.sync()
.then(() => {
    app.listen(3000, () => {
        console.log('Server is running on http://localhost:3000');
    });
}) 
.catch(err => {
    console.log(err);
});