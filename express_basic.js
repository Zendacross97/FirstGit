// Deliverables

// 1. Define Sequelize Models

// Create Sequelize models for the following entities:
// Users
// Buses
// Bookings
// Payments

// 2. Insert Data Using Sequelize

// Use Sequelize’s create() method to insert sample data:
// Add 3 users to the database.
// Add 2 buses to the database.

// 3. Implement Sequelize Queries

// Fetching Users:
// Use findAll() to retrieve all users from the database.

// Filtering Buses by Seat Availability:
// Use findAll() with a where condition to get all buses where available seats are greater than 10.


// 4. Implement API Endpoints and check on postman

// User Endpoints:
// POST /users → Add a new user using Sequelize.
// GET /users → Retrieve all users from the database.

// Bus Endpoints:
// POST /buses → Add a new bus using Sequelize.
// GET /buses/available/:seats → Retrieve all buses with available seats greater than the specified number.

const express = require('express');
const db = require('./util/db-connection');
const userRoutes = require('./routes/userRoutes');
const userModel = require('./models/user');
const busModel = require('./models/bus');
const bookingModel = require('./models/booking');
const paymentModel = require('./models/payment');

const app = express();

app.use(express.json());
app.use('/', userRoutes);

db.sync({force: false})
.then(() => {
    app.listen(3000, () => {
        console.log("Server is running on http://localhost:3000");
    });
})
.catch((err) => {
    console.log(err);
});