const express = require('express');
const expenseController = require('../controllers/expense_controller');

const router = express.Router();

router.post('/add', expenseController.addExpense);
router.get('/get', expenseController.getExpense);
router.delete('/delete/:id', expenseController.deleteExpense);

module.exports = router;