// Deliverables:

// Implement controllers to handle product logic.
// Update your routes to call the controller functions, improving the structure and maintainability of the product routes.

// Testing with Postman
// GET /products → Should return "Fetching all products"
// GET /products/1 → Should return "Fetching product with ID: 1"
// POST /products → Should return "Adding a new product"
// 💡 Make sure to use Postman to verify that your APIs work correctly!

const express = require('express');
const app = express();

app.use(express.json()); // Middleware to parse JSON request bodies

const userRoute = require('./routes/userRoutes');
const productRoute = require('./routes/productRoutes');
const cartRoute = require('./routes/cartRoutes')

app.use('/users', userRoute);
app.use('/products', productRoute);
app.use('/cart', cartRoute);


app.use('*', (req, res) => {
    res.status(404).send(`Page Not Found`);
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});