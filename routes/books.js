const express = require('express');
const router = express.Router(); // Correctly initialize the router

router.get('/', (req, res) => {
    console.log('Here is the list of books!');
    res.status(200).send('Here is the list of books!');
});

router.post('/', (req, res) => {
    console.log('Book has been added!');
    res.status(201).send('Book has been added!');
});

module.exports = router;