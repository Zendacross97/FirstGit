const express = require('express');
const studentController = require('../controllers/studentController');
const router = express.Router();

router.post('/add', studentController.addEntries);
router.post('/addingStudentWithCard', studentController.addingValuesToStudentsAndIdentityTable);
router.post('/addingStudentWithDepartment', studentController.addingValuesToStudentsAndDepartmentTable)
router.get('/get', studentController.getEntries);
router.get('/get/:id', studentController.getEntriesById);
router.put('/update/:id', studentController.updateEntry);
router.delete('/delete/:id', studentController.deleteEntry);

module.exports = router;