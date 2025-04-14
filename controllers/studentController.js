const db = require(`../util/db-connection`);

const addEntries = (req, res) => {
    const { name, email, age } = req.body;
    const insertQuery = 'INSERT INTO students (name, email, age) VALUES (?, ?, ?)'

    db.execute(insertQuery, [name, email, age], (err, result) => {
        if (err) {
            console.log(err.message);
            res.status(500).send(err.message);
            db.end();
            return;
        }
        console.log(result);
        res.status(200).send(`Student with name ${name} successfully added`);
    });
};

const getEntries = (req, res) => {
    const getQuery = 'SELECT * FROM students'

    db.execute(getQuery, (err, result) => {
        if (err) {
            console.log(err.message);
            res.status(500).send(err.message);
            db.end();
            return;
        }
        if (result.affectedRows===0) {
            res.status(404).send('Student not found')
        }
        console.log(result);
        res.status(200).json(result);
    });
};

const getEntriesById = (req, res) => {
    const { id } = req.params;
    const getQuery = 'SELECT * FROM students WHERE id = ?'

    db.execute(getQuery, [id], (err, result) => {
        if (err) {
            console.log(err.message);
            res.status(500).send(err.message);
            db.end();
            return;
        }
        if (result.affectedRows===0) {
            res.status(404).send('Student not found')
        }
        console.log(result);
        res.status(200).json(result[0]);
    });
};

const updateEntry = (req, res) => {
    const { id } = req.params;
    const { name, email, age } = req.body;
    const updateQuery = 'UPDATE students SET name = ?, email = ?, age = ? WHERE id = ?';

    db.execute(updateQuery, [name, email, age, id], (err, result) => {
        if(err){
            console.log(err.message);
            res.status(500).send(err.message);
            return;
        }
        if(result.affectedRows===0){ // if student with the mentioned id is !found
            res.status(404).send('Student not found');
            return;
        }
        console.log(result);
        res.status(200).send('Student info has been updated');
    });
};

const deleteEntry = (req, res) => {
    const { id } = req.params;
    const deleteQuery = 'DELETE FROM students WHERE id = ?'

    db.execute(deleteQuery, [id], (err, result) => {
        if(err){
            console.log(err.message);
            res.status(500).send(err.message);
            db.end();
            return;
        }
        if(result.affectedRows===0){ // if student with the mentioned id is !found
            res.status(404).send('Student not found');
            return;
        }
        console.log(result);
        res.status(200).send(`Student with id ${id} has been deleted`);
    });
};


module.exports = {
    addEntries,
    getEntries,
    getEntriesById,
    updateEntry,
    deleteEntry
};