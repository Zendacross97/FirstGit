const mysql = require('mysql2');

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

    const creationUsers = `CREATE TABLE IF NOT EXISTS users (
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

    connection.execute(creationUsers, (err) => {
        if (err) {
            console.log('Error creating Users table:', err);
            connection.end();
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

module.exports = connection;