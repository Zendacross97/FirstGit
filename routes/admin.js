const express = require(`express`);
const router = express.Router();
const path = require(`path`);
const rootDir = require(`../util/path`);

router.use(`/`,(req,res,next)=>{ 
    next();
})

router.get(`/add-product`,(req,res,next)=>{ 
    res.sendFile(path.join(rootDir,'views','add-product.html'));
})

router.post(`/add-product`,(req,res,next)=>{ 
    res.redirect(`/shop`);
})

module.exports = router;