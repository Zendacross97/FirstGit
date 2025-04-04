// Deliverables:

// Build an Express server with:

// Set Up an Express Server that listens on a specified port.
// Use Express Router to modularize your routes.
// Create basic endpoints for students and courses.
// Handle dynamic requests using req.params.id.
// Implement a custom 404 Not Found handler for invalid routes.

// Features & API Endpoints

// Home Route:
// / - Welcome message.
// Student Routes:
// /students - List all students.
// /students/:id - Fetch a student by ID.
// Course Routes:
// /courses - List all courses.
// /courses/:id - Fetch a course by ID.
// 404 Handling:
// Handle invalid routes with a "Page not found" message.

// Note:

// Make use of req.params.id for working with /:id
// The code has been provided with default values for students and courses which will be used for fetching the values.

// Use the following data: (Right now we are using demo data but in real time we'll be using the data that is fetched from the server)

// Students Data
// const students = [
// { id: 1, name: "Alice" },
// { id: 2, name: "Bob" },
// { id: 3, name: "Charlie" }
// ];

// Courses Data
// const courses = [
// { id: 1, name: "Frontend", description: "HTML, CSS, JS, React" },
// { id: 2, name: "Backend", description: "Node.js, Express, MongoDB" }
// ];

// Example :

// Endpoints to Test
// Home Route:
// GET /
// Response: "Welcome to the Student & Course Portal API!"
// Student Routes:
// GET /students
// Response: "Students: Alice, Bob, Charlie"
// GET /students/1
// Response: "Student: Alice"
// GET /students/99
// Response: "Student not found"
// Course Routes:
// GET /courses
// Response: "Courses: Frontend, Backend"
// GET /courses/1
// Response: "Course: Frontend, Description: HTML, CSS, JS, React"
// GET /courses/99
// Response: "Course not found"

// Invalid Route:
// Example: GET /invalid
// Response: "Page not found"

const express = require('express');
const app = express();

app.use(express.json()); // Middleware to parse JSON request bodies

const studentRouter = require('./routes/student');
const courseRouter = require('./routes/course');

app.get('/', (req, res, next) => {
    res.status(200).send("Welcome to the Student & Course Portal API!");
});

app.use('/students', studentRouter);
app.use('/courses', courseRouter);


app.use('*', (req, res) => {
    res.status(404).send(`Page Not Found`);
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});