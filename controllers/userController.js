const User = require('../models/userModel');
const ForgotPasswordRequests = require('../models/forgotPasswordRequests');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Sib = require('sib-api-v3-sdk');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

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

function token(id) {
    return jwt.sign({ UserId: id }, 'secret_key')
}

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
                res.status(200).json({ message: 'User login sucessful', token: token(userDetails[0].id) });
            }
            else {
                return res.status(401).json({ error: 'User not authorized'});
            }
         });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const forgotUser = async (req, res) => {
    try {
        const { email } = req.params;
        if(!email) {
            return res.status(400).json({ error: 'Email credential is incomplete'})
        }
        const uuid = uuidv4();
        const userId = await User.findAll({ 
            where: { email: email },
            attributes: ['id']
        });
        if (userId.length === 0) {
            return res.status(404).json({ error: 'User not found' });
         }
        await ForgotPasswordRequests.create({
            uuid: uuid,
            isactive: true,
            UserId: userId[0].id
        })
        const client = Sib.ApiClient.instance
        const apiKey = client.authentications['api-key'];
        apiKey.apiKey = process.env.BREVO_API_KEY;
        const tranEmailApi = new Sib.TransactionalEmailsApi()
        const sender = {
            email: 'sidhchakraborty66@gmail.com',
            name: 'Siddhartha Chakraborty'
        }
        const receiver = [{
            email: `${ email }`
        }]
        tranEmailApi.sendTransacEmail({
            sender,
            to: receiver,
            subject: 'Reset Password',
            textContent: 'Click on the link to reset your { { params.role } }.',
            params: {
                role: 'Password'
            },
            htmlContent: `<h1> Daily Expense Tracker <h1>
                        <h3> Your password reset link <h3>
                        <p> Click here: <a href="http://localhost:3000/password/resetpassword/${uuid}">Reset</a><p>`
        })
        res.status(200).json({ message: 'Password reset link has been sent on your email' });

    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const resetPassword = async (req, res) => {
    try {
        const { uuid } = req.params;
        const resetDetails = await ForgotPasswordRequests.findAll({
            where: {
                uuid: uuid,
                isactive: true
            }
        })
        if (resetDetails.length === 0) {
            return res.status(404).send('User not found');
         }
         res.status(200).sendFile(path.join(__dirname, '../views/resetPassword.html'));
    } catch(error) {
        res.status(500).json({error: error.message});
    }
}

const updatePassword = async (req, res) => {
    try {
        const { password, confirmPassword } = req.body;
        const { uuid } = req.params;
        if (!password || !confirmPassword) {
            return res.status(400).json({ error: 'Password credential is incomplete' });
        }
        if (password !== confirmPassword) { //confirm password
            return res.status(400).json({ error: 'Password and confirm password do not match' });
        }
        const resetDetails = await ForgotPasswordRequests.findAll({ //fetch the user id
            where: {
                uuid: uuid,
                isactive: true
            }
        })
        if (resetDetails.length === 0) {
            return res.status(404).json({ error: 'User not found' });
         }
         bcrypt.hash(password, 10, async (err, hash) => { //encrypt the password
            if (err) {
                return res.status(500).json({ error: 'Something went wrong' });
            }
            else {
                await User.update( //update the password
                    { password: hash },
                    { where: { id: resetDetails[0].UserId } }
                );
                await ForgotPasswordRequests.update( //update the isactive status
                    { isactive: false },
                    { where: { uuid: uuid } }
                )
                res.status(200).json({ message: 'Password updated successfully' });
            }
        });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

module.exports = {
    signUpUser,
    logInUser,
    forgotUser,
    resetPassword,
    updatePassword
};