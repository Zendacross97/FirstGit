const getProducts = (req, res) => {
    res.status(200).send("Fetching all products");
};

const postProducts = (req, res) => {
    res.status(201).send("Adding a new product");
};

const getProductsById = (req, res) => {
    const productId = req.params.id;
    res.status(200).send(`Fetching product with ID: ${productId}`);
};

module.exports = {
    getProducts,
    postProducts,
    getProductsById
};