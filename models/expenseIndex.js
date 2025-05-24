const Users = require('./userModel');
const Expenses = require('./expense_model');
const Orders = require('./orderModel');
const ForgotPasswordRequests = require('./forgotPasswordRequests');

// Define associations

// Users and Expenses one-to-many relationship
Users.hasMany(Expenses);
Expenses.belongsTo(Users);

// Users and Orders one-to-one relationship
Users.hasOne(Orders);
Orders.belongsTo(Users);

// Users and ForgotPasswordRequests has one-to-many relationship
Users.hasMany(ForgotPasswordRequests);
ForgotPasswordRequests.belongsTo(Users);

module.exports = {
    Users,
    Expenses,
    Orders,
    ForgotPasswordRequests
};