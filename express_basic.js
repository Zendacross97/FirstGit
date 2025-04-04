// Deliverables:

// 1.Set Up the Server

// Use Express.js to create a server.

// 2.Create the Routes (API Endpoints) You need to create these routes:(Make sure you are using router for this)

// GET /books: Print a message and send a response like "Here is the list of books!".
// POST /books: Print the book data sent in the request and send a message like "Book has been added!".

// 3.Test Your API

// Use Postman or any API testing tool to test your endpoints.
// Ensure that GET requests return the correct message and POST requests log the received data.

const express = require('express');
const app = express();

app.use(express.json()); // Middleware to parse JSON request bodies

const booksRouter = require('./routes/books');

// Middleware to log the request URL and method 
app.use((req, res, next) => {
    console.log(`${req.method} request made to ${req.url}`);
    next(); // Pass control to the next middleware or route handler
});

app.use('/books', booksRouter);

app.use('*', (req, res) => {
    res.status(404).send(`<h1>404 - Page Not Found</h1>`);
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});