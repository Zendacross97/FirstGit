const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../util/db-connection');

const department = sequelize.define('departments', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = department;