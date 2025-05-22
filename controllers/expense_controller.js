const Expense = require('../models/expense_model');
const Order = require('../models/orderModel');
const User = require('../models/userModel');
const sequelize = require('../util/db-connection');

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
    const transaction = await sequelize.transaction();
    try {
        console.log('id:', req.user);
        const { amount, description, category } = req.body; //fetch data from request body
        if (!amount || !description || !category) { //check if all fields are present
            await transaction.rollback();
            return res.status(400).json({ error: 'Expense fields are incomplete' });
        }
        const expense = await Expense.create({ //create a new expense
            ...req.body,
            UserId: req.user.id
        }, { transaction });
        const oldTotalExpense = await User.findAll({ //fetch the old total expense
            where: { id: req.user.id },
            attributes: ['totalExpense'],
            transaction
        });
        await User.update( //update the total expense
            { totalExpense: +oldTotalExpense[0].totalExpense + +amount },
            { where: { id: req.user.id }, transaction }
        );
        console.log('newTotalExpense', +oldTotalExpense[0].totalExpense + +amount);
        await transaction.commit();
        res.status(201).json( { message: 'Expense details added successfully', expense });
    } catch (err) {
        await transaction.rollback();
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
    const transaction = await sequelize.transaction();
    const { expenseId } = req.params; 
    try {
        if (expenseId == 'undefined') {
            await transaction.rollback();
            return res.status(400).json({ error: 'Id is missing' });
        }
        const deletedExpense = await Expense.findAll({
            where: { id: expenseId, UserId: req.user.id },
            attributes: ['amount'],
            transaction
        });
        if (!deletedExpense.length) {
            await transaction.rollback();
            return res.status(404).json({ error: 'Expense not found' });
        }
        const noOfRows = await Expense.destroy({
            where: { id: expenseId, UserId: req.user.id },
            transaction
        });
        if(noOfRows === 0) {
            await transaction.rollback();
            return res.status(404).json({ error: 'Expense does not belong to this user' });        
        }
        else {
            const oldTotalExpense = await User.findAll({
                where: { id: req.user.id },
                attributes: ['totalExpense'],
                transaction
            });
            await User.update(
                { totalExpense: +oldTotalExpense[0].totalExpense - +deletedExpense[0].amount },
                { where: { id: req.user.id }, transaction }
            );
            console.log('newTotalExpense', +oldTotalExpense[0].totalExpense - +deletedExpense[0].amount);
            await transaction.commit();
            res.status(200).json({ message: 'Expense details deleted successfully' });
        }
    } catch (err) {
        await transaction.rollback();
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