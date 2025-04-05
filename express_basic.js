// Deliverables:

// 🔹 Implement routes using controllers for:

// Users (userController.js)
// Products (productController.js)
// Cart (cartController.js)

// Note: You can get the :id or :user from url by using req.params.id /req.params.userId

// Requirements:

// User Routes:

// GET /users:
// Output: "Fetching all users"
// POST /users:
// Output: "Adding a new user"
// GET /users/:id:
// Output: "Fetching user with ID: <id>"

// Controller: userController.js
// Logic:
// getAllUsers: Fetches all users.
// addUser: Adds a new user.
// getUserById: Fetches a specific user by ID.

// Product Routes:

// GET /products:
// Output: "Fetching all products"
// POST /products:
// Output: "Adding a new product"
// GET /products/:id:
// Output: "Fetching product with ID: <id>"

// Controller: productController.js
// Logic:
// getAllProducts: Fetches all products.
// addProduct: Adds a new product.
// getProductById: Fetches a specific product by ID.

// Cart Routes:

// GET /cart/:userId:
// Output: "Fetching cart for user with ID: <userId>"
// POST /cart/:userId:
// Output: "Adding product to cart for user with ID: <userId>"

// Controller: cartController.js
// Logic:
// getCartForUser: Fetches the cart for a user.
// addProductToCart: Adds a product to the user's cart.

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