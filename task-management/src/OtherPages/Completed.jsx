import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion';
import { ToastContainer,toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Header from '../Header';
const Completed = () => {
  const [tasks,setTasks]=useState([])
  const token=localStorage.getItem('authToken')
  async function fetchData(){
    try{
      const response= await axios.get('http://localhost:4000/fetch_completed',{
        headers: {  // ✅ Headers should be outside the body
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
        
        
      })
      // console.log(response);
      setTasks(response.data)

    }
    catch(error)
    {

    }
  }
  useEffect(()=>{
    console.log(token);
    
    fetchData();
  },[])
  return (
  <>
  <Header/>
  <br />
   <div className="task-summary" >
      <div className="card">
            <Link to="/total">Total Tasks: {tasks.length}</Link>
          </div>
          <div className="card">
            <Link to="/completed">Completed: {tasks.filter(t => t.status==="completed").length}</Link>
          </div>
          <div className="card">
            <Link to="/pending">Pending: {tasks.filter(t => t.status==="pending").length}</Link>
          </div>
        </div>
        
        <br />
   <div className="task-grid">
          <AnimatePresence>
            {tasks.filter((task)=> task.status==="completed")
            .map((task, index) => (
              <motion.div
                key={index}
                className={`task-card ${task.completed ? 'completed' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6}}

              >
                <span><strong>Title</strong>:{task.title}</span>
                <span><strong>Type</strong>:{task.type}</span>
                <span className="t-dis"> description:{task.description}</span>
                <span>CompletedOn :{Date(task.completedOn).toLocaleString()}</span>
               
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <ToastContainer position="top-center" autoClose={5000} theme="dark" />
  </>
  )
}

export default Completed