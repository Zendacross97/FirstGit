// Task:
// Write SQL queries to create the following tables:

// Users Table:
// This table should store user information.
// Columns: id, name, email

// Buses Table:
// This table will store information about available buses.
// Columns: id, busNumber, totalSeats, availableSeats

// Bookings Table:
// This table will store seat bookings.
// Columns: id, seatNumber

// Payments Table:
// This table will store payment information.
// Columns: id, amountPaid, paymentStatus

// Instructions:

// Write SQL CREATE TABLE queries for each of the tables.
// Use appropriate data types for each column (e.g., INT for IDs, VARCHAR for text, etc.).
// Ensure the id column in each table serves as a primary key.

// 💡 Hint: If you're unsure about the data types, consider using AUTO_INCREMENT for IDs and VARCHAR(255) for text fields.

const express = require('express');
const mysql = require('mysql2');
const app = express();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Mysql@1997',
    database: 'testdb'
});

connection.connect((err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Connection has been created');

    const creationUsers = `CREATE TABLE IF NOT EXISTS Users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255)
    )`;

    const creationBuses = `CREATE TABLE IF NOT EXISTS Buses (
        id INT AUTO_INCREMENT PRIMARY KEY,
        busNumber INT NOT NULL,
        totalSeats INT NOT NULL,
        availableSeats INT NOT NULL
    )`;

    const creationBookings = `CREATE TABLE IF NOT EXISTS Bookings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        seatNumber INT NOT NULL
    )`;

    const creationPayments = `CREATE TABLE IF NOT EXISTS Payments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        amountPaid INT,
        paymentStatus VARCHAR(255)
    )`;

    // Execute each query separately
    connection.execute(creationUsers, (err) => {
        if (err) {
            console.log('Error creating Users table:', err);
            return;
        }
        console.log('Users table created');
    });

    connection.execute(creationBuses, (err) => {
        if (err) {
            console.log('Error creating Buses table:', err);
            return;
        }
        console.log('Buses table created');
    });

    connection.execute(creationBookings, (err) => {
        if (err) {
            console.log('Error creating Bookings table:', err);
            return;
        }
        console.log('Bookings table created');
    });

    connection.execute(creationPayments, (err) => {
        if (err) {
            console.log('Error creating Payments table:', err);
            return;
        }
        console.log('Payments table created');
    });
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});