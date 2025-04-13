const db = require('../util/db-connection');

const getAllBuses = (req, res) => {
    const getAllQuery = 'SELECT * FROM Buses WHERE availableSeats > 10'

    db.execute(getAllQuery, (err, result) => {
        if(err){
            console.log(err.message);
            res.status(500).send(err.message);
            db.end();
            return;
        }
        res.status(200).json(result);
    });
};

const addBus = (req, res) => {
    const { busNumber, totalSeats, availableSeats } = req.body;
    const addQuery = 'INSERT INTO Buses (busNumber, totalSeats, availableSeats) VALUES ( ?, ?, ?)'

    db.execute(addQuery, [busNumber, totalSeats, availableSeats], (err) => {
        if(err){
            console.log(err.message);
            res.status(500).send(err.message);
            return;
        }
        res.status(200).send('Bus info successfully added')
    })
};

module.exports = {
    getAllBuses,
    addBus,
};