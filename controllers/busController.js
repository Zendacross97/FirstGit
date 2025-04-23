const Buses = require('../models/bus');
const { Op } = require('sequelize');

const getAllBuses = async (req, res) => {
    try{
        const buses = await Buses.findAll({
            where: { availableSeats: { [Op.gt]: 10 } }
        });
        if (!buses || buses.length===0) {
            res.status(404).send('No bus available');
        }
        res.status(200).json(buses);
    } catch (error) {
        res.status(500).send('Bus info cannot be found');
    }
};

const addBus = async (req, res) => {
    try {
        const { busNumber, totalSeats, availableSeats } = req.body;
        const bus = await Buses.create({
            busNumber: busNumber,
            totalSeats: totalSeats,
            availableSeats: availableSeats
        });
        res.status(201).send('Bus info added');
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

module.exports = {
    getAllBuses,
    addBus,
};