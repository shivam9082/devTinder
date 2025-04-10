const mongoose = require('mongoose');

const connectDB = async ()=>{
    await mongoose.connect(
        "mongodb+srv://shivam_9082:xJeGmTemugU5aUCw@cluster0.w6tsttw.mongodb.net/devTinder?retryWrites=true&w=majority&appName=Cluster0"
    );
};

module.exports = connectDB;

