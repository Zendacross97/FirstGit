const User = require('./userModel');
const Expense = require('./expense_model');
const Order = require('./orderModel');

// Define associations

// User and Expense one-to-many relationship
User.hasMany(Expense);
Expense.belongsTo(User);

// User and Order one-to-one relationship
User.hasOne(Order);
Order.belongsTo(User);

module.exports = {
    User,
    Expense,
    Order
};