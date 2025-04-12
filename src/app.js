const express = require('express');
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");

// middleware provided by the express
app.use(express.json());

//deleting user in the database

app.delete("/user", async (req,res)=>{
    const userId = req.body.userId;
    try{
        //const users = await User.findByIdAndDelete({_id:userId});
        const users = await User.findByIdAndDelete(userId);
        console.log(users);
        res.send("User deleted successfully");
    }catch(err){
        res.status(400).send("something went wrong")
    }
});

//updating user in the database
app.patch("/user/:userId", async (req,res)=>{
    const userId = req.params?.userId;
    const data = req.body;
    try{

        const ALLOWED_UPDATES = ["photoUrl","about","gender","skills","age"];

        const isUpdateAllowed = Object.keys(data).every((k)=>
            ALLOWED_UPDATES.includes(k)
        );

        if(!isUpdateAllowed){
            throw new Error("update is not allowed");
        }

        if(data?.skills.length>10){
            throw new Error("Skills should not be more than 10");
        }

        const users = await User.findByIdAndUpdate({_id:userId},data,{
            returnDocument: "after",
            runValidatiors:true,
        });
        console.log(users);
        res.send("User updated successfully");
    }catch(err){
        res.status(400).send("something went wrong")
    }
});

//getting an user from the database using condition
app.get("/user", async (req,res)=>{
    const email = req.body.emailId;
    try{
        const users = await User.find({emailId:email});
        if(users.length ===0){
            res.send("User not found");
        }else{
            res.send(users);
        }
    }catch(err){
        res.status(400).send("something went wrong")
    }
});

//getting all users.. as feed
app.get("/feed",async (req,res)=>{

    try{
        const users = await User.find({});
        if(users.length === 0){
            res.send("No user present at the moment");
        }
        else{
            res.send(users);
        }
    }catch(err){
        res.status(400).send("something went wrong");
    }
});

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


