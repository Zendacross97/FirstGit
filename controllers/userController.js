const Users = require('../models/user');

const getAllUsers = async (req, res) => {
    try{
        const users = await Users.findAll();
        if (!users || users.length===0) {
            res.status(404).send('No User available');
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send('User info cannot be found');
    }
};

const addUser = async (req, res) => {
    
    try {
        const { email, name } = req.body;
        const User = await Users.create({
            email: email,
            name: name,
        });
        res.status(201).send('User info added');
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

module.exports = {
    getAllUsers,
    addUser
};