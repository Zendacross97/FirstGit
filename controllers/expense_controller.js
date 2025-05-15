const Expense = require('../models/expense_model');

exports.addExpense = async (req, res) => {
    try {
        console.log(req.user);
        const { amount, description, category } = req.body;
        if (!amount || !description || !category) {
            return res.status(400).json({ error: 'Expense fields are incomplete' });
        }
        const expense = await Expense.create({
            ...req.body,
            UserId: req.user.id
        });
        res.status(201).json( { message: 'Expense details added successfully', expense });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getExpense = async (req, res) => {
    try {
        const expense = await Expense.findAll({
            where: { UserId: req.user.id }
        });
        if (!expense || expense.length === 0) {
            return res.status(404).json({ error: 'No expense details found' });
        }
        res.status(200).json(expense);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteExpense = async (req, res) => {
    const { expenseId } = req.params;
    try {
        if (expenseId == 'undefined') {
            return res.status(400).json({ error: 'Id is missing' });
        }
        const noOfRows = await Expense.destroy({
            where: { id: expenseId, UserId: req.user.id }
        });
        if(noOfRows === 0) {
            return res.status(404).json({ error: 'Expense does not belong to this user' });        
        }
        else {
            res.status(200).json({ message: 'Expense details deleted successfully' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};