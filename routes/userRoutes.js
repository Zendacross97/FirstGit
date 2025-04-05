const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send("Fetching all users");
});

router.post('/', (req, res) => {
    res.status(201).send("Adding a new user");
});

router.get('/:id', (req, res) => {
    const userId = req.params.id;
    res.status(200).send(`Fetching user with ID: ${userId}`);
});

module.exports = router;