const express = require(`express`);
const router = express.Router();

const productsController = require(`../controllers/products`);

router.use(`/`,(req,res,next)=>{ 
    next();
})

router.get(`/add-product`,productsController.getAddProduct);
router.post(`/add-product`,productsController.postAddProduct);

module.exports = router;