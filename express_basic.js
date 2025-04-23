// Deliverables:

// Understanding Associations & Foreign Keys
// Explain what a foreign key is and how it helps link tables.
// Define relationships between models.

// Link Users & Bookings (One-to-Many)

// A user can make multiple bookings.
// Modify the Bookings table to store which user made the booking.

// Define the association:
// User.hasMany(Booking)
// Booking.belongsTo(User)
// Insert sample bookings with user IDs.

// Link Buses & Bookings (One-to-Many)

// A bus can have multiple bookings.
// Modify the Bookings table to store which bus was booked.
// Define the association:
// Bus.hasMany(Booking)
// Booking.belongsTo(Bus)
// Insert sample bookings with bus IDs.

// 2. API Endpoints for Testing in Postman
// Step 1: Create Users & Buses First
// Before making a booking, create sample users and buses.

// Create a New User
// POST /users
// Body:
// { "name": "John Doe", "email": "john@example.com" }
// Create a New Bus
// POST /buses
// Body:
// { "busNumber": "MH12AB1234", "totalSeats": 40, "availableSeats": 30 }
// Step 2: Create a Booking
// Once we have users and buses, we can create a booking.

// Create a New Booking for a User
// POST /bookings
// Body:
// { "userId": 1, "busId": 1, "seatNumber": 10 }

// 3: Fetch Data Using Associations

// Use Sequelize associations (findAll() with include) to fetch related data.

// Get All Bookings for a Specific User (with Bus Details)
// GET /users/:id/bookings
// Expected Response:
// [
//   {
//     "id": 1,
//     "seatNumber": 10,
//     "bus": {
//       "busNumber": "MH12AB1234"
//     }
//   }
// ]

// Get All Bookings for a Specific Bus (with User Details)
// GET /buses/:id/bookings
// Expected Response:
// [
//   {
//     "id": 1,
//     "seatNumber": 10,
//     "user": {
//       "name": "John Doe",
//       "email": "john@example.com"
//     }
//   }
// ]

const express = require('express');
const db = require('./util/db-connection');
const usertRoutes = require('./routes/userRoutes');
const busModel = require('./models/bus');
const userModel = require('./models/user');
const busIndexModel = require('./models/busIndex');

const app = express();

app.use(express.json());
app.use('/', usertRoutes);

db.sync({force: false})
.then(() => {
    app.listen(3000, () => {
        console.log("Server is running on http://localhost:3000");
    });
})
.catch((err) => {
    console.log(err);
});