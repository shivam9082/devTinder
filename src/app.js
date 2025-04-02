const express = require('express');
const app = express();

//function inside app.use() is known as request handler..


app.use("/",function(req,res){
    res.send('server is listening on port 3000 on route /');
});



app.listen(3000, ()=>{
    console.log('server is running successfully');
});