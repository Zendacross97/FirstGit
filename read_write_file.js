// const http=require(`http`);//not needed for express js
// const routes=require("./routes");//not needed for express js
const express=require(`express`);

// routes.anotherFunction();
// const server=http.createServer(routes);
const app=express();
app.use((req,res,next)=>{ 
    console.log(`In the middleware`);
    next(); //allows the request to continue to the next middleware in line
})
app.use((req,res,next)=>{ 
    console.log(`In another middleware`);
    res.send(`<h1>Hello from express</h1>`);
})
// routes.testFunction();
// const server=http.createServer(routes.handeler);//not needed for express js
// const server=http.createServer(app);

// server.listen(3000,()=>{
//     console.log(`server is running`);
// })

app.listen(3000,()=>{
    console.log(`server is running`);
});//express js will take care of creating the server and listening to the port