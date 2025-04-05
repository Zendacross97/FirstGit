const getCartForUser = (req, res) => {
    const userId = req.params.id;
    res.status(200).send(`Fetching cart for user with ID: ${userId}`);
};

const addProductToCart = (req, res) => {
    const userId = req.params.id;
    res.status(201).send(`Adding product to cart for user with ID: ${userId}`);
};

module.exports = {
    getCartForUser,
    addProductToCart
}