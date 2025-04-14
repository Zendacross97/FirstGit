const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('testdb','root','Mysql@1997', {
    host: 'localhost',
    dialect: 'mysql'
});

(async () => {
    try{
        await sequelize.authenticate();//authenticating the sequelize connection
        console.log('Connection to the Database has been created');
    }
    catch (error) {
        console.log(error);
    }
})(); //IIFE Functions: immediately invoked function expression

module.exports = sequelize;