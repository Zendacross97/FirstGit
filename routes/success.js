const express=require('express');
const router=express.Router();

const successController=require('../controllers/status');
router.get(`/`,successController.getStatus);

module.exports=router;