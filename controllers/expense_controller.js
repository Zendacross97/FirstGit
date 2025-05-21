const Expense = require('../models/expense_model');
const Order = require('../models/orderModel');
const User = require('../models/userModel');
const sequelize = require('sequelize');

exports.getPaymentStatus = async (req, res) => {
    try {
        const order = await Order.findAll({
            where: { UserId: req.user.id }
        });
        if (order && order.length !== 0) {
            const orderStatus = order[0].status;
            res.status(200).json({ orderStatus });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

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
        const oldTotalExpense = await User.findAll({
            where: { id: req.user.id },
            attributes: ['totalExpense']
        })
        await User.update(
            { totalExpense: +oldTotalExpense[0].totalExpense + +amount },//using + operator to convert string to number
            { where: { id: req.user.id } }
        );
        console.log('newTotalExpense', +oldTotalExpense[0].totalExpense + +amount);
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
        const deletedExpense = await Expense.findAll({
            where: { id: expenseId, UserId: req.user.id },
            attributes: ['amount']
        });
        const noOfRows = await Expense.destroy({
            where: { id: expenseId, UserId: req.user.id }
        });
        if(noOfRows === 0) {
            return res.status(404).json({ error: 'Expense does not belong to this user' });        
        }
        else {
            const oldTotalExpense = await User.findAll({
                where: { id: req.user.id },
                attributes: ['totalExpense']
            });
            await User.update(
                { totalExpense: +oldTotalExpense[0].totalExpense - +deletedExpense[0].amount },
                { where: { id: req.user.id } }
            );
            console.log('newTotalExpense', +oldTotalExpense[0].totalExpense - +deletedExpense[0].amount);
            res.status(200).json({ message: 'Expense details deleted successfully' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getLeaderboard = async (req, res) => {
    try {
        const leaderboard = await User.findAll({
            attributes: ['name', 'totalExpense'],
            order: [['totalExpense', 'DESC']]
        })
        res.status(200).json(leaderboard);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};