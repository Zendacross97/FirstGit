const path=require('path');
const rootDir=require('../util/path');

exports.getContacts = (req,res,next)=>{
    res.sendFile(path.join(rootDir,'views','contact.html'));
}

exports.postContacts = (req,res,next)=>{
    res.redirect(`/success`);
}