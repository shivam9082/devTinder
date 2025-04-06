const express = require('express');
const app = express();

const {adminAuth,userAuth} = require('./middlewares/auth');

app.use("/admin",adminAuth);

//app.use("/user",userAuth);

app.get("/user",userAuth,(req,res)=>{
    res.send('user data send successfully');
});

app.post("/user/login",()=>{
    res.send("user logged in successfully");
})

app.get("/admin/getAllData",(req,res)=>{
    res.send("all data sent");
});

app.get("/admin/deleteUser",(req,res)=>{
    res.send("user deleted successfully");
});





app.listen(3000, ()=>{
    console.log('server is running successfully');
});