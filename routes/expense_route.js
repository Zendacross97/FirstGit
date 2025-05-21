const express = require('express');
const expenseController = require('../controllers/expense_controller');
const userAuthentication = require('../middlewares/auth');

const router = express.Router();

router.get('/payment_status', userAuthentication.authenticate, expenseController.getPaymentStatus);
router.post('/addExpense', userAuthentication.authenticate, expenseController.addExpense);
router.get('/getExpense', userAuthentication.authenticate, expenseController.getExpense);
router.delete('/deleteExpense/:expenseId', userAuthentication.authenticate, expenseController.deleteExpense);
router.get('/leaderboard', userAuthentication.authenticate, expenseController.getLeaderboard);

module.exports = router;