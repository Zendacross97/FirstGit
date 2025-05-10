const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const signUpUser = async (req, res) => {  
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
             return res.status(400).json({ error: 'Sign-up credentials are incomplete' });
        }
        const userDetails = await User.findAll({ where: { email: email } });
        if (userDetails.length !== 0) {
            return res.status(400).json({ error: 'User already exists' });
        }
        bcrypt.hash(password, 10, async (err, hash) => { // 10 is number of salt-rounds to generate strings of random salt along with password
            if (err) {
                return res.status(500).json({ error: 'Something went wrong' });
            }
            else {
                await User.create({ name, email, password: hash });
                res.status(201).json({ message: 'User created successfully' });
            }
        });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const logInUser = async (req, res) => {  
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Login credentials are incomplete' });
        }
        const userDetails = await User.findAll( { where: { email: email } } );
         if (userDetails.length === 0) {
            return res.status(404).json({ error: 'User not found' });
         }
         bcrypt.compare(password, userDetails[0].password, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Something went wrong' });
            }
            else if (result === true) {
                res.status(200).json({ message: 'User login sucessful' });
            }
            else {
                return res.status(401).json({ error: 'User not authorized'});
            }
         });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

module.exports = {
    signUpUser,
    logInUser
};