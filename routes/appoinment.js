const express = require('express');
const appoinmentController = require('../controllers/appoinments');

const router = express.Router();

router.post('/add', appoinmentController.addAppoinment);
router.get('/get', appoinmentController.getAppoinment);
router.delete('/delete/:id', appoinmentController.deleteAppoinment);

module.exports = router;