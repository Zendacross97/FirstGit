const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send("Fetching all products");
});

router.post('/', (req, res) => {
    res.status(201).send("Adding a new product");
});

router.get('/:id', (req, res) => {
    const productId = req.params.id;
    res.status(200).send(`Fetching product with ID: ${productId}`);
});

module.exports = router;