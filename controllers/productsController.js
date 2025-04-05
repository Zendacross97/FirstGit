// Deliverables:

// Your mission is to build a Node.js application that serves an HTML file in response to a GET request.

// Set up a server using express.
// Add a GET endpoint (e.g., /api/products) to handle GET requests.
// Use res.sendFile() to serve an HTML file from your project directory inside folder VIEW.
// Return a form with following attributes:
// Form Structure:

// The form should contain a label with the text "Product Name".
// The label's for attribute and the input's id attribute should both be set to product for consistency and accessibility.
// The form should include an input field where users can enter the product name. The input field should have the name attribute set to productName.
// The form should contain a submit button with the content "Add Product".

// Keep your project organized and fun to explore!

// Also try to run the given setup on VS Code on your system and once approved push your code to GitHub.

const path = require('path');

const getAllProducts = (req, res) => {//send file = to redirect when api is called through an end point
    res.status(200).sendFile(path.join(__dirname, '..', 'views', 'productViews.html'));
};//__dirname = directory name i.e. controllers folder here
// '..' = going up one folder i.e. root folder

const addProduct = (req, res) => {
    res.status(201).send("Adding a new product");
};

const getProductById = (req, res) => {
    const productId = req.params.id;
    res.status(200).send(`Fetching product with ID: ${productId}`);
};

module.exports = {
    getAllProducts,
    addProduct,
    getProductById
};