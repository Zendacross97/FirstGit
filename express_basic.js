const express = require('express');
const mysql = require('mysql2');
const app = express();

const connection = mysql.createConnection({ // setting up the connection credentials
    host: 'localhost',
    user: 'root',
    password: 'Tomal@1997',
    database: 'testdb'
});

connection.connect((err) => { // connecting with mysql server
    if(err){
        console.log(err);
        return;
    }
    console.log('connection has been created');

    const creationQuery = `create table Students(
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(20),
        emanil VARCHAR(20)
    )`

    connection.execute(creationQuery, (err) => {//executing the connection
        if(err){
            console.log(err);
            connection.end();
            return;
        }
        console.log('Table is created');
    });
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});