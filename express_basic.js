// Deliverables:

// Build an Express server that listens on port 4000 and handles the following endpoints:

// GET /products - Respond with "Here is the list of all products."
// POST /products - Respond with "A new product has been added."
// GET /categories - Respond with "Here is the list of all categories."
// POST /categories - Respond with "A new category has been created."

// Additional Requirements:
// Wildcard Route:
// Use a wildcard route (*) to handle all undefined routes and return the following custom error page as HTML:<h1>404 - Page Not Found</h1>
// Also add the status as 404.
// Test all valid routes (GET and POST).
// Access an undefined route, like /random, and verify that the custom error page is displayed.

// Test your routes using Postman or the browser to ensure everything works correctly.

const express = require('express');
const app = express();

app.use(express.json()); // Middleware to parse JSON request bodies

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

app.use('*',(req,res)=>{
    res.status(404).send(`<h1>404 - Page Not Found Yaar</h1>`)
})

app.listen(4000, () => {
    console.log( "Server is running on http://localhost:3000");
});