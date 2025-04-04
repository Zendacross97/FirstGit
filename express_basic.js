// Deliverables:

// Implement Express Router in your project, moving routes to a separate file as done in the video.
// Use app.use() to connect the router to your main server file.
// Test your routes using Postman or the browser to ensure everything works correctly.

// 💡 Why is this important?

// Using Express Router helps in better organization, scalability, and maintainability of your backend applications.

const express = require('express');
const app = express();

app.use(express.json()); // Middleware to parse JSON request bodies

const productsRouter = require('./routes/products');
const categoriesRouter = require('./routes/categories');

// Middleware to log the request URL and method
app.use((req, res, next) => {
    console.log(`${req.method} request made to ${req.url}`);
    next(); // Pass control to the next middleware or route handler
});

app.use('/products', productsRouter);

app.use('/categories', categoriesRouter);

app.use('*', (req, res) => {
    res.status(404).send(`<h1>404 - Page Not Found</h1>`);
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});