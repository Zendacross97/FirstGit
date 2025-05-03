const { Sequelize, DataTypes } = require("sequelize");
 
const sequelize = require("../util/db-connection");
 
const attendance = sequelize.define("attendence", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  Date: {
    type: DataTypes.DATEONLY, 
    allowNull: false
  },
  Siva: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Rajesh: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Ashok: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Sai: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Haritha: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Ram: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Krishna: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Anu: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Ammu: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Adi: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Venkat: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = attendance;
