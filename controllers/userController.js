const User = require('../models/userModel');

const signUpUser = async (req, res) => {  
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
             return res.status(400).json({ error: 'Sign-up credentials are incomplete' });
        }
        const userDetaiils = await User.create({ name, email, password });
        res.status(201).json(userDetaiils);
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
            return res.status(400).json({ error: 'User not found' });
         }
         if (userDetails[0].password != password) {
            return res.status(400).json({ error: 'Password is incorrect' }); 
         }
        res.status(200).json({message: 'Login successful'});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

module.exports = {
    signUpUser,
    logInUser
};