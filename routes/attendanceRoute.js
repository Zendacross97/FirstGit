const express = require('express');
const attendanceController = require('../controllers/attendanceControllers');

const router = express.Router();

router.post('/add', attendanceController.addAttendance);
router.get('/report', attendanceController.getAttendanceReport);
router.get('/:date', attendanceController.getAttendance);

module.exports = router;