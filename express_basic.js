const express = require('express');
db = require('./util/db-connection');
const studentRoutes = require('./routes/studentRoutes');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.use('/students', studentRoutes);

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});