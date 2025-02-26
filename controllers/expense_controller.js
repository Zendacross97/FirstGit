const details = require('../models/expense_model');

exports.addExpense = async (req, res) => {
    try {
        if (!req.body.amount || !req.body.description || !req.body.category) {
            throw new Error(`Please fill the required field`);
        }

        const amount = req.body.amount;
        const description = req.body.description;
        const category = req.body.category;

        const data = await details.create({
            amount: amount,
            description: description,
            category: category
        });

        res.status(201).json({ newExpenseDetails: data });

    } catch (err) {
        console.log('Add expense is failing', JSON.stringify(err));
        res.status(500).json({ error: err });
    }
};

exports.getExpense = async (req, res) => {
    try {
        const data = await details.findAll();
        res.status(200).json({ newExpenseDetails: data });
    } catch (err) {
        console.log('Get expense is failing', JSON.stringify(err));
        res.status(500).json({ error: err });
    }
};

exports.deleteExpense = async (req, res) => {
    try {
        if (req.params.id == 'undefined') {
            return res.status(400).json({ error: 'Id is missing' });
        }

        const uId = req.params.id;
        await details.destroy({
            where: { id: uId }
        });
        res.status(200).json({ message: 'Expense deleted' });

    } catch (err) {
        console.log('Delete user is failing', JSON.stringify(err));
        res.status(500).json({ error: err });
    }
};
