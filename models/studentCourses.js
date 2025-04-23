const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../util/db-connection');

const studentCourses = sequelize.define('studentCourses', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    }
});

module.exports = studentCourses;