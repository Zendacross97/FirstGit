const express = require('express');
const db = require('./util/db-connection');
const appoinmentsModel = require('./models/appoinment');
const appoinmentRoutes = require('./routes/appoinment');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/appoinment',appoinmentRoutes);

db.sync()
    .then(result => {
        console.log('Database connected successfully'); // Debugging log
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch(err => {
        console.error('Database connection error:', err); // Debugging log
    });