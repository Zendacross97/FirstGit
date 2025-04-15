const {  Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../util/db-connection");

const Appoinments = sequelize.define("Appoinments", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
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
  number: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  }
});

module.exports = Appoinments;