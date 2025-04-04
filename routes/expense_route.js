const express = require('express');
const router = express.Router();

const expenseController = require('../controllers/expense_controller');

router.post('/add-expense', expenseController.addExpense);
router.get('/get-expense', expenseController.getExpense);
router.delete('/delete-expense/:id', expenseController.deleteExpense);

module.exports = router;