const User = require('../models/userModel');

const addUser = async (req, res) => {  
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            throw new Error ('Login credentials are incomplete');
        }
        const userDetaiils = await User.create({ name, email, password });
        res.status(201).json(userDetaiils);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

module.exports = {
    addUser
};