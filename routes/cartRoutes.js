const express = require('express');
const router = express.Router();

router.get('/:id', (req, res) => {
    const userId = req.params.id;
    res.status(200).send(`Fetching cart for user with ID: ${userId}`);
});

router.post('/:id', (req, res) => {
    const userId = req.params.id;
    res.status(201).send(`Adding product to cart for user with ID: ${userId}`);
});

module.exports = router;