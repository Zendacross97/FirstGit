const express = require('express');
const userController = require('../controllers/userController');
const busController = require('../controllers/busController');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

router.get('/users', userController.getAllUsers);
router.post('/users', userController.addUser);
router.get('/buses', busController.getAllBuses);
router.post('/buses', busController.addBus);
router.post('/bookings', bookingController.addBooking);
router.get('/users/:id/bookings', bookingController.bookingForUserById);
router.get('/buses/:id/bookings', bookingController.bookingForBusById);

module.exports = router;