const path = require('path');//to use path module for file path

const express=require(`express`);//to use express
const app=express();//to create an express application

const bodyParser=require(`body-parser`);//to parse the body of the request
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname,`public`)));//to access css file in public folder

const adminRoutes=require(`./routes/admin`);//to use admin.js file
app.use(`/admin`,adminRoutes);

const shopRoutes=require(`./routes/shop`);//to use shop.js file
app.use(`/shop`,shopRoutes);

const contactRoutes=require(`./routes/contact`);//to use contact.js file
app.use(`/contactus`,contactRoutes);

const successRoutes=require(`./routes/success`);//to use success.js file
app.use(`/success`,successRoutes);

const errorRoutes = require(`./controllers/error`);//to use error.js file
app.use(errorRoutes. get404);//to use error.js file

app.listen(3000,()=>{
    console.log(`server is running`);
});