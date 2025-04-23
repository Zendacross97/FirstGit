const Users = require('../models/user');
const Booking = require('../models/booking');
const Bus = require('../models/bus');

const addBooking = async (req, res) => {
    try{
        await Booking.create({...req.body});
        res.status(201).send('Booking details created');
    } catch (err) {
        res.status(500).json( {error: err.message} );
    }
}

const bookingForUserById = async (req, res) => {
    try{
        const {id} = req.params;
        const bookedUsers = await Booking.findAll({
            where: { UserId: id },
            attributes: ['id', 'seatNumber'],
            include: {
                model: Bus,
                attributes: ['busNumber']
            }
        });
        res.status(200).json(bookedUsers);
    } catch (err) {
        res.status(500).json( {error: err.message} );
    }
};


const bookingForBusById = async (req, res) => {
    try{
        const {id} = req.params;
        const bookedBus = await Booking.findAll({
            where: { BusId: id },
            attributes: ['id', 'seatNumber'],
            include: {
                model: Users,
                attributes: ['name', 'email']
            }
        });
        res.status(200).json(bookedBus);
    } catch (err) {
        res.status(500).json( {error: err.message} );
    }
};

module.exports = {
    addBooking,
    bookingForUserById,
    bookingForBusById
}