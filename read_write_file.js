const http=require(`http`);
fs=require(`fs`);
const { text } = require("stream/consumers");
const server=http.createServer((req,res)=>{
    res.setHeader(`Content-type`,`text/html`);
    if(req.url===`/`){
        fs.readFile(`message.txt`,(err,data)=>{
            if(err){
                console.log(err);
            }
            res.write(`<h1>${data.toString()}</h1>
            <form action="/message" method="POST">
            <label for="name">Name:</label>
            <input type="text" id="name" name="username">
            <button type="submit">Add</button>
            </form>`);//data=buffer-value(numbers)
            res.end();
        });
    }
    else{
        if(req.url==`/message`){
            let dataChunks=[];
            req.on(`data`,(chunks)=>{     
                dataChunks.push(chunks);
            });
            req.on(`end`,()=>{
                let buffer=Buffer.concat(dataChunks);
                let value=buffer.toString().split("=")[1];//before split(username=ABC),after([`username`,`ABC`])
                fs.writeFile(`message.txt`,value,(err)=>{
                    res.statusCode=302;
                    res.setHeader(`Location`,`/`);
                    res.end();
                });
            });
        }
    }
})
server.listen(3000,()=>{
    console.log(`server is running`);
})