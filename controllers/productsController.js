const path = require('path');

const getAllProducts = (req, res) => {//send file = to redirect when api is called through an end point
    res.status(200).sendFile(path.join(__dirname, '..', 'views', 'productViews.html'));
};//__dirname = directory name i.e. controllers folder here
// '..' = going up one folder i.e. root folder

const addProduct = (req, res) => {
    console.log(req.body)//{ product: 'cvbnm,' }
    const data = req.body.product;//cvbnm,
    res.status(201).json({addedProduct: data});
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