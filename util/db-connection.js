const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'Mysql@1997',
    database: 'testdb'
});

connection.connect((err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Connection has been created');

    const creationStudents = `CREATE TABLE IF NOT EXISTS students (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        age INT NOT NULL
    )`;

    connection.execute(creationStudents, (err) => {
        if (err) {
            console.log('Error creating Students table:', err);
            connection.end();
            return;
        }
        console.log('Students table created');
    });
});

module.exports = connection;