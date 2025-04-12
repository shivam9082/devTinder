const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required: true,
        minLength : 3,
        maxLength : 50,
    },
    lastName : {
        type : String
    },
    emailId : {
        type : String,
        required: true,
        unique : true,
        lowercase : true,
        trim : true,
    },
    password :{
        type : String,
        required : true,
    },
    age : {
        type : Number,
        required : true,
        min : 18
    },
    gender : {
        type : String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender is not valid!!");
            }
        },
    },
    photoUrl : {
        type : String,
        default : "photo-url",
    },
    about : {
        type : String,
        default : "Hey this is about me",
    },
    skills : {
        type : [String],
    }
    
}, {timestamps:true});

const User = mongoose.model("User",userSchema);

module.exports = User;