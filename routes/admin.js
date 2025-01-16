const express = require(`express`);
const router = express.Router();

router.use(`/`,(req,res,next)=>{ 
    console.log(`This always runs`);
    next();
})

router.get(`/add-product`,(req,res,next)=>{ 
    console.log(`In another middleware`);
    res.send(`<form action="/admin/product" method="POST">
            <input type="text" name="title">
            <input type="number" name="size">
            <button type="submit">Add Product</button>
            </form>`);
})

router.post(`/product`,(req,res,next)=>{ 
    console.log(req.body);
    res.redirect(`/shop`);
})

module.exports = router;