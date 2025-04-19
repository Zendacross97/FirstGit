const express = require('express');
const db = require('./util/db-connection');
const studentRoutes = require('./routes/studentRoutes');
const studentModel = require('./models/students');
const identityCardModel = require('./models/identityCard');
const departmentModel = require('./models/department');
const indexModel = require('./models/index');

const app = express();

app.use(express.json());
app.use('/students', studentRoutes);

db.sync({force: false})
.then(() => {
    app.listen(3000, () => {
        console.log("Server is running on http://localhost:3000");
    });
})
.catch((err) => {
    console.log(err);
});