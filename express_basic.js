const express = require('express');
const db = require('./util/db-connection');
const studentRoutes = require('./routes/studentRoutes');
const courseRoutes = require('./routes/courseRoutes');
const studentModel = require('./models/students');
const identityCardModel = require('./models/identityCard');
const departmentModel = require('./models/department');
const courses = require('./models/courses');
const studentCourses = require('./models/studentCourses');
const indexModel = require('./models/index');

const app = express();

app.use(express.json());
app.use('/students', studentRoutes);
app.use('/courses', courseRoutes);

db.sync({force: false})
.then(() => {
    app.listen(3000, () => {
        console.log("Server is running on http://localhost:3000");
    });
})
.catch((err) => {
    console.log(err);
});