const express=require('express')
require('dotenv').config();
const jwt=require('jsonwebtoken')
const {body,validationResult}=require('express-validator')
const User = require('./Models/User')
const app=express()
const cors=require('cors')
const mongoose=require('mongoose')
app.use(express.json())
const corsOptions={
    origin:"https://tm-momin-zahoors-projects.vercel.app/",
    credentials:true
}

app.use(cors(corsOptions));

mongoose.connect('mongodb://0.0.0.0:27017/Users')
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
});

function checkAuth(req,res,next){
    let { authorization } = req.headers;
 
    
    if (!authorization) {
        return res.status(401).send({ message: "You are not authorized" });
    }
    let token=authorization.split(' ')[1]
    var decoded=jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
    
        
        if(err){
            res.send({message:"invalid-token"})
        }
        else{
            req.userData = decoded
           
           next()
        }
        
            
    })
     
    
}
app.get('/welcome',(req,res)=>{
    res.send("welcome to task manager")
})
app.post('/change-password',body('newPassword').notEmpty(),checkAuth,(req,res)=>{
    const userId=req.userData.userId;
    const result=validationResult(req)
    if(!result.isEmpty())
        {
           return res.send({errors:result.array()})
        }
        const {newPassword}=req.body;
        console.log(newPassword);
        User.updateOne({_id:userId},{$set:{password:newPassword}})
        .then((result) => {
            if (result.modifiedCount > 0) {
                console.log("success");
                
              res.status(200).json({ message: "User updated successfully", result });
            } else {
              res.status(404).json({ message: "User not found or no changes made" });
            }
          })
          .catch((error) => {
            res.status(500).json({ message: "Update failed", error: error.message });
          });
        
})
app.post('/register',body('name','role','email','password').notEmpty(),async(req,res)=>{
    const result=validationResult(req)
    if(!result.isEmpty())
    {
       return res.send({errors:result.array()})
    }
    const {name,role,email,password}=req.body;
    
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
        // console.log(email,password);
        const compareUser=await User.find({email:email,password:password})
        if(compareUser.length>0)
        {
            const token=jwt.sign({name:compareUser[0].name,
                                  userId:compareUser[0]._id
            },process.env.JWT_SECRET);
            return res.status(200).send({token});
            
        }
        else{
            res.status(401).send({ message: 'Invalid credentials' });
        }
        // res.send(email)
       
        
})
app.get('/get-tasks',checkAuth,async(req,res)=>{
id=req.userData.userId
const userinfo=await User.findById(id)

// console.log(userinfo.tasks);
res.send(userinfo.tasks)

})
app.delete('/delete-task/:taskid', checkAuth, async (req, res) => {
    try {
        const { taskid } = req.params;  // Get task ID from URL
        const userId = req.userData.userId;  // Get logged-in user ID

        // console.log("Deleting task with ID:", taskid);

        // Use $pull to remove the task from the tasks array
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $pull: { tasks: { _id: taskid } } },  // Remove task with matching _id
            { new: true }  // Return the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "Task deleted successfully", tasks: updatedUser.tasks });

    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


app.put('/complete-task',body('taskid').notEmpty(),checkAuth,async(req,res)=>{
       try{
        const result=validationResult(req)
        if(!result.isEmpty())
        {
            return res.send({errors:result.array()})
        }
        const {taskid}=req.body;
        // console.log(taskid);
        const userId=req.userData.userId;
        const updatedUser=await User.findOneAndUpdate(
            {_id:userId,"tasks._id":taskid},
            { $set: { "tasks.$.status": "completed", "tasks.$.completedOn": new Date() } }, //  Updates status
            {new:true}
        )

        if (!updatedUser) {
            return res.status(404).json({ message: "Task not found!" });
        }

        res.json({ message: "Task marked as completed", tasks: updatedUser.tasks });
       }
        catch (error) {
            console.error("Error updating task:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
       
        
})
app.post('/add-task',body('title','description','tasktype').notEmpty(),checkAuth,async(req,res)=>{
        const result=validationResult(req)
       
     
        if(!result.isEmpty()){
            return res.send({errors:result.array()})
        }
        const {title,description,tasktype}=req.body;
        id=req.userData.userId
        const userinfo=await User.findById(id)
//         console.log(id);
//         console.log("User tasks from DB:", JSON.stringify(userinfo.tasks, null, 2));
// console.log("Searching for:", { title, description, tasktype });
        const comparetask = userinfo.tasks.filter((task)=>
        {
            return task.title== title && task.description== description && task.type==tasktype;
        } )
        // console.log("compared",comparetask);
        
      
        
    
        if(!comparetask.length>0){
            const newTask = {
                title:title,
                description:description,
                type: tasktype,
                addedOn: new Date(),
                status: "pending", // Default status
            };
            
            
            
            userinfo.tasks.push(newTask);
            await userinfo.save()
            // console.log(userinfo);
            res.status(201).json({ message: "Task added successfully!", task: newTask });
        } else{
            res.status(500).json({ error: "Task already Exists!", });
        }
       
        
        
})
app.post('/search-tasks',body('searchvalue').notEmpty(),checkAuth,async(req,res)=>{
   try{
    const result=validationResult(req)
    if(!result.isEmpty())
    {
        return res.status(400).json({ errors: result.array() });
    }
    const {searchvalue}=req.body
    const id=req.userData.userId
    const formattedSearchValue = searchvalue.replace(/\s+/g, '').toLowerCase();
     const userinfo=await User.findById(id).lean()
     if (!userinfo) {
         return res.status(404).json({ message: "User not found" });
     }
    const searchedtask=userinfo.tasks.filter((task)=> task.title.replace(/\s+/g, '').toLowerCase().includes(formattedSearchValue))
    // console.log(searchedtask)
    res.send(searchedtask)
    
   }
   catch (error) {
    console.error("Error searching tasks:", error);
    res.status(500).json({ error: error.message });
}
   
})
app.get('/profile',checkAuth, async (req, res)=>{
    // console.log(req.headers);
    id=req.userData.userId
    const userinfo=await User.findById(id)
    // console.log(userinfo);
    
    res.send(userinfo)
})
app.get('/fetch_completed',checkAuth,async(req,res)=>{
    id=req.userData.userId
const userinfo=await User.findById(id)

// console.log(userinfo.tasks);
res.send(userinfo.tasks)
})
app.get('/fetch_pending',checkAuth,async(req,res)=>{
    id=req.userData.userId
const userinfo=await User.findById(id)

// console.log(userinfo.tasks);
res.send(userinfo.tasks)
})
app.listen(4000,()=>{
    console.log(`server is listening on http://127.0.0.1:${process.env.PORT}`)
    
})