// Deliverables:

// Follow the instructor and complete the following requirements.

// Create a server using express.
// Serve a form using a GET request.
// Use Axios to send a POST request from the form, allowing users to add products to the server.
// Return the user-added product as a response and console.log the data on the server.
// Test your application using Postman to ensure everything works as expected.

const express = require('express');
const app = express();

app.use(express.json()); // Middleware to parse JSON request bodies

// Serve static files from the public directory
app.use(express.static('public'));

const userRoute = require('./routes/userRoutes');
const productRoute = require('./routes/productRoutes');
const cartRoute = require('./routes/cartRoutes');

// Register routes
app.use('/users', userRoute);
app.use('/products', productRoute);
app.use('/cart', cartRoute);

app.use('*', (req, res) => {
    res.status(404).send(`Page Not Found`);
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});