const express = require('express');
const app = express();

//function inside app.use() is known as route handler..
app.get("/user",function(req,res){

 //res.send("user get method is called successfully.");
 // if no response is sent then the url be in infinite loop..
 // so we have to send the response using res.send('something');
});




app.listen(3000, ()=>{
    console.log('server is running successfully');
});