const express=require('express')
const jwt=require('jsonwebtoken')
const {body,validationResult}=require('express-validator')
const User = require('./Models/User')
const app=express()
app.use(express.json())



app.post('/register',body('name','role','email','password').notEmpty(),async(req,res)=>{
    const result=validationResult(req)
    if(!result.isEmpty())
    {
        res.send({errors:result.array()})
    }
    const {name,role,email,password}=req.body;
    console.log(name,role,email,password);
    let  newUser=new User({
        name:name,
        role:role,
        email:email,
        password:password,
    })
    // await newUser.save();
    res.send(newUser)

})
app.post('/login',body('email','password').notEmpty(),async(req,res)=>{
        const result=validationResult(req)
        if(!result.isEmpty())
        {
            res.send({errors:result.array()})
        }
        const {email,password}=req.body;
        console.log(email,password);
        res.send(email)
        
})

app.listen(4000,()=>{
    console.log("server is listening on http://127.0.0.1:4000")
    
})