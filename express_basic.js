// Deliverables:

// Build an Express server that listens on port 4000 and handles the following endpoints:

// GET /products - Respond with "Here is the list of all products."
// POST /products - Respond with "A new product has been added."
// GET /categories - Respond with "Here is the list of all categories."
// POST /categories - Respond with "A new category has been created."

// Additional Requirements:
// Logging Middleware:
// Add middleware to log the HTTP method and endpoint accessed. For example, when a GET /products request is made, log:

// GET request made to /products

// Hint: For getting the method of request make use of req.method and for accessing the endpoint use req.url

const express = require('express');
const app = express();

app.use(express.json()); // Middleware to parse JSON request bodies

// Middleware to log the request URL and method
app.use((req, res, next) => {
    console.log(`${req.method} request made to ${req.url}`);
    next(); // Pass control to the next middleware or route handler
});

app.get('/products', (req, res) => {
    res.status(200).send(`<h1>Here is the list of all products.</h1>`);
});

app.post('/products', (req, res) => {
    res.status(201).json("A new product has been added.");
});

app.get('/categories', (req, res) => {
    res.status(200).send(`<h1>Here is the list of all categories.</h1>`);
});

app.post('/categories', (req, res) => {
    res.status(201).json("A new category has been created.");
});

app.use('*', (req, res) => {
    res.status(404).send(`<h1>404 - Page Not Found</h1>`);
});

app.listen(4000, () => {
    console.log("Server is running on http://localhost:4000");
});