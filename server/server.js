const express=require('express')
require('dotenv').config();
const jwt=require('jsonwebtoken')
const {body,validationResult}=require('express-validator')
const User = require('./Models/User')
const app=express()
const cors=require('cors')
const mongoose=require('mongoose')
app.use(express.json())
app.use(cors())

mongoose.connect('mongodb://0.0.0.0:27017/Users')
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
});
app.post('/register',body('name','role','email','password').notEmpty(),async(req,res)=>{
    const result=validationResult(req)
    if(!result.isEmpty())
    {
       return res.send({errors:result.array()})
    }
    const {name,role,email,password}=req.body;
    console.log(name,role,email,password);
    let  newUser=new User({
        name:name,
        role:role,
        email:email,
        password:password,
        tasks:[]
    })
    await newUser.save();
    return res.status(200).send({ message: "ok" });

})
app.post('/login',body('email','password').notEmpty(),async(req,res)=>{
        const result=validationResult(req)
        if(!result.isEmpty())
        {
           return res.send({errors:result.array()})
        }
        const {email,password}=req.body;
        console.log(email,password);
        const compareUser=await User.find({email:email,password:password})
        if(compareUser.length>0)
        {
            const token=jwt.sign({name:compareUser[0].name},process.env.JWT_SECRET);
            return res.status(200).send({token});
            
        }
        else{
            res.status(401).send({ message: 'Invalid credentials' });
        }
        // res.send(email)
       
        
})

app.listen(4000,()=>{
    console.log("server is listening on http://127.0.0.1:4000")
    
})