const bus = require('./bus');
const user = require('./user');
const booking = require('./booking');

// one to many -> User and Booking
user.hasMany(booking);
booking.belongsTo(user);

// one to many -> Bus and Booking
bus.hasMany(booking);
booking.belongsTo(bus);

module.exports = {
    bus,
    user,
    booking
};