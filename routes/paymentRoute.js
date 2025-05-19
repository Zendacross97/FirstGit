const express = require('express');
const paymentController = require('../controllers/paymentController');

const router = express.Router();

router.post('/pay', paymentController.createOrder);
router.get('/payment-status/:Id', paymentController.getPaymentStatus);

module.exports = router;