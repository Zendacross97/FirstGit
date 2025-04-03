const express = require('express');
const app = express();

app.use(express.json()); // Middleware to parse JSON request bodies

let user = {
    id: 1,
    name: 'Ram'
};

app.post('/add', (req, res) => {
    const { value } = req.body; // Ensure the client sends a "value" key in the request body
    if (!value) {
        return res.status(400).json({ error: 'Value is required' });
    }
    user = { ...user, guest: value }; // Update the user object with the new value
    res.status(201).json(user); // Respond with the updated user object
});

app.get('/welcome', (req, res) => {
    res.status(200).send(`<h1>Welcome, ${user.guest || 'Guest'}</h1>`); // Handle cases where "guest" is undefined
});

app.listen(3000, () => {
    console.log('Server is up and running on port 3000! Ready to handle requests.');
});