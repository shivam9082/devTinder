const express = require('express');
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");
const {validateSignUp} = require("./utils/validation");
const bcrypt = require("bcrypt");

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
    try{
        const {firstName,lastName,emailId,password} = req.body;
        
        //validation of data
    validateSignUp(req);

    // encrypt the password
    const hashPassword = await bcrypt.hash(password,10);
    const user = new User({
        firstName,
        lastName,
        emailId,
        password:hashPassword
    });
    await user.save();
    res.send("User data saved successfully");
    }
    catch(err){
        res.status(400).send("Error in saving user : " + err.message);
    }
});

app.post("/login",async (req,res)=>{
   try{
    const {emailId,password} = req.body;
    const user = await User.findOne({emailId : emailId});
    if(!user){
        throw new Error("Invalid credentials!!!");
    }

    const isPasswordValid = await bcrypt.compare(password,user.password);
    if(isPasswordValid){
        res.send("Login successfully!!!");
    } else{
        throw new Error("Invalid credentials!!!");
    }
   } catch(err){
    res.status(400).send("ERROR : " + err.message);
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


