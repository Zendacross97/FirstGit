const path=require('path');
const routeDir=require('../util/path');

exports.getStatus = (req,res,next)=>{ 
    res.sendFile(path.join(routeDir,'views','success.html'));
}