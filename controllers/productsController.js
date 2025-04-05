const getAllProducts = (req, res) => {
    res.status(200).send("Fetching all products");
};

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