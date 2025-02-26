const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Details = sequelize.define("expense", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  amount: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false,
  }
}, {
  timestamps: false // Disable the automatic addition of createdAt and updatedAt fields
});

module.exports = Details;