const express = require('express');
const expenseController = require('../controllers/expense_controller');

const router = express.Router();

router.post('/addExpense', expenseController.addExpense);
router.get('/getExpense', expenseController.getExpense);
router.delete('/deleteExpense/:id', expenseController.deleteExpense);

module.exports = router;