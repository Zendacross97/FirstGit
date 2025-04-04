// Students Data
const students = [
{ id: 1, name: "Alice" },
{ id: 2, name: "Bob" },
{ id: 3, name: "Charlie" }
];

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    let a = [];
    for(let i in students){
        a.push(students[i].name);
    }
    a = a.toString();
    res.status(200).send(`Students: ${a}`);
})

router.get('/:id', (req, res) => {
    const studentId = parseInt(req.params.id); // Convert id to a number
    for (let i in students) {
        if (students[i].id === studentId) {
            return res.status(200).send(`Student: ${students[i].name}`); // Use return to stop further execution
        }
    }
    res.status(404).send('Student not found'); // Send response if no match is found
})

module.exports = router;