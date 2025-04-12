const express = require('express');
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");

// middleware provided by the express
app.use(express.json());

app.post("/signup",async (req,res)=>{
    const user = new User(req.body);
    
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


