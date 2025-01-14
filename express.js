const express=require(`express`);
const bodyParser=require(`body-parser`);

const app=express();
app.use(bodyParser.urlencoded({extended:false}));

app.use(`/`,(req,res,next)=>{ 
    console.log(`This always runs`);
    next();
})

app.use(`/add-product`,(req,res,next)=>{ 
    console.log(`In another middleware`);
    res.send(`<form action="/product" method="POST">
            <input type="text" name="title">
            <input type="number" name="size">
            <button type="submit">Add Product</button>
            </form>`);
})

app.post(`/product`,(req,res,next)=>{ 
    console.log(req.body);
    res.redirect(`/`);
})

app.use(`/`,(req,res,next)=>{ 
    console.log(`Final middleware`);
    res.send(`<h1>Hello from express</h1>`);
})

app.listen(3000,()=>{
    console.log(`server is running`);
});