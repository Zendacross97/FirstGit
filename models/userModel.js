const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../util/db-connection');

const Users = sequelize.define('Users', {
    id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        totalExpense: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        }
});
 
module.exports = Users;