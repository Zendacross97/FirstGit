// Courses Data
const courses = [
{ id: 1, name: "Frontend", description: "HTML, CSS, JS, React" },
{ id: 2, name: "Backend", description: "Node.js, Express, MongoDB" }
];

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    let a = [];
    for(let i in courses){
        a.push(courses[i].name);
    }
    a = a.toString();
    res.status(200).send(`Courses: ${a}`);
})

router.get('/:id', (req, res) => {
    const courseId = parseInt(req.params.id); // Convert id to a number
    for (let i in courses) {
        if (courses[i].id === courseId) {
            return res.status(200).send(`Course: ${courses[i].name}, Description: ${courses[i].description}`); // Use return to stop further execution
        }
    }
    res.status(404).send('Course not found'); // Send response if no match is found
})

module.exports = router;