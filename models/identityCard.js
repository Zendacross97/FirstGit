const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../util/db-connection');

const identityCard = sequelize.define('identityCard', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    cardNo: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false
    }
});

module.exports = identityCard;