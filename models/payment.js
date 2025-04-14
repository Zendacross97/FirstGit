const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../util/db-connection');

const Payments = sequelize.define('Payments', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    amountPaid: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    paymentStatus: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Payments;