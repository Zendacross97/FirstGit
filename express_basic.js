// Deliverables

// 1.Insert Sample Data

// Add and retrieve add into the database.

// 2. Implement API Endpoints

// User Endpoints:
// POST /users → Add a new user.
// GET /users → Retrieve all users from the database.

// Bus Endpoints:
// POST /buses → Add a new bus.
// GET /buses/available/:seats → Retrieve all buses with more than the specified number of available seats.

// Check this in postman after done with creating the endpoints:

// Fetching Users:
// Write an SQL query to retrieve all users from the database.

// Filtering Buses by Seat Availability:
// Write an SQL query to retrieve all buses where available seats are greater than 10.

const express = require('express');
db = require('./util/db-connection');
const userRoutes = require('./routes/userRoutes');
const app = express();

app.use(express.json());

app.use('/', userRoutes);

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});