const mongoose = require("mongoose");
const validator = require("validator");

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
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email address is invalid " + value);
            }
        }
    },
    password :{
        type : String,
        required : true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter a strong password. The password you have entered is weak " + value);
            }
        }
    },
    age : {
        type : Number,
       // required : true,
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
    // photoUrl : {
    //     type : String,
    //     default : "photo-url",
    //     validate(value){
    //         if(!validator.isURL(value)){
    //             throw new Error("photo url is invalid " + value);
    //         }
    //     }
    // },
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