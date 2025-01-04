const http=require(`http`);
const routes=require("./routes");

// routes.anotherFunction();
// const server=http.createServer(routes);

routes.testFunction();
const server=http.createServer(routes.handeler);

server.listen(3000,()=>{
    console.log(`server is running`);
})