const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('expense', 'root', 'Mysql@1997', {
//     host: 'localhost',
//     dialect: 'mysql'
// });

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql'
    }
);

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to the Database has been created');
        }
catch (error) {
        console.log(error);
    }
})();

module.exports = sequelize;