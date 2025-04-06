const express = require('express');
const app = express();

//function inside app.use() is known as route handler..
app.get("/user",function(req,res){
 res.send("user get method is called successfully.");
});

app.post("/user",function(req,res){
    res.send("user post method is called successfully.");
   });

   app.delete("/user",function(req,res){
    res.send("user delete method is called successfully.");
   });
app.use("/",function(req,res){
    res.send('server is listening on port 3000 on route /');
});



app.listen(3000, ()=>{
    console.log('server is running successfully');
});