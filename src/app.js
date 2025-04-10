const express = require('express');
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");

app.post("/signup",async (req,res)=>{
    const user = new User({
        firstName : "Shivam",
        lastName : "Pandey",
        emailId : "shivam@gmail.com",
        age : "20",
        gender : "male"
    });
    
    try{
        await user.save();
    res.send("User data saved successfully");
    }
    catch(err){
        res.status(400).send("Error in saving user : " + err.message);
    }
});

connectDB()
.then(()=>{
    console.log('database connected successfully...');
    app.listen(3000, ()=>{
        console.log('server is running successfully');
    });
})
.catch((err)=>{
    console.log("error in connecting db");
});


