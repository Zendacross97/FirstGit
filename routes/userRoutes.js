const express = require('express');
const userController = require('../controllers/userController');
const busController = require('../controllers/busController')
const router = express.Router();

router.get('/users', userController.getAllUsers);
router.post('/users', userController.addUser);
router.get('/buses', busController.getAllBuses);
router.post('/buses', busController.addBus);

module.exports = router;