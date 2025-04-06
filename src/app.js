const express = require('express');
const app = express();


app.get("/user",(req,res,next)=>{
console.log('response1');
next();
},[(req,res,next)=>{
    console.log('response2');
    next();
},(req,res,next)=>{
    console.log('response3');
    next();
}],
(req,res)=>{
    console.log('resp4');
    res.send('hello client');
}
);




app.listen(3000, ()=>{
    console.log('server is running successfully');
});