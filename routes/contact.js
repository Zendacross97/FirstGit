express=require('express');
const router=express.Router();

const contactController=require('../controllers/register');
router.get(`/`,contactController.getContacts);
router.post(`/`,contactController.postContacts);

module.exports=router;
