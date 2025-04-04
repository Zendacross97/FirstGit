const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.status(200).send('Here is the list of all products.')
});

router.post('/', (req,res)=>{
    res.status(201).send('A new product has been added.')
});

module.exports = router;