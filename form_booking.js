const sequelize = require('./util/database');

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json({ extended: false }));

const cors = require('cors');
app.use(cors());

const details = require("./models/form_details");

app.post('/users/add-user', async (req,res) => {
    try {

        if (!req.body.name || !req.body.email || !req.body.number) {
            return res.status(400).json({ error: `Please fill the required field` });
        }

        const name = req.body.name;
        const email = req.body.email;
        const number = req.body.number;

        const data = await details.create({
            name: name,
            email: email,
            number: number
        });

    res.status(201).json({ newUserDetails: data });

    } catch (err) {

        console.log('Add user is failing', JSON.stringify(err));
        res.status(500).json({ error: err });

    };
})

app.get('/users/get-users', async (req,res) => {
    try {

        const data = await details.findAll();
        res.status(200).json({ newUserDetails: data });

    } catch (err) {

        console.log('Get user is failing', JSON.stringify(err));
        res.status(500).json({ error: err });

    };
});

app.delete('/users/delete-user/:id', async (req,res) => {
    try {
        if (req.params.id == 'undefined') {
            console.log('Id is missing');
            return res.status(400).json({ error: 'Id is missing' });
        }

        const uId = req.params.id;
        await details.destroy({
            where: { id: uId }
        });
        res.status(200).json({ message: 'Users deleted' });

    } catch (err) {

        console.log('Delete user is failing', JSON.stringify(err));
        res.status(500).json({ error: err });

    };
});

sequelize
    .sync()
    .then(result => {
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch(err => {
        console.log(err);
    });