const db = require('../util/db-connection');

const getAllUsers = (req, res) => {
    const getAllQuery = 'SELECT * FROM users';

    db.execute(getAllQuery, (err, results) => { // Use 'results' to get query data
        if (err) {
            console.log(err.message);
            res.status(500).send(err.message);
            db.end();
            return;
        }
        res.status(200).json(results); // Send the query results as JSON
    });
};

const addUser = (req, res) => {
    const { email, name } = req.body;
    const addQuery = 'INSERT INTO users (name, email) VALUES ( ?, ?)'

    db.execute(addQuery, [name, email], (err) => {
        if(err){
            console.log(err.message);
            res.status(500).send(err.message);
            return;
        }
        res.status(200).send('User successfully added')
    })
};

module.exports = {
    getAllUsers,
    addUser,
};