import React, { useEffect, useState } from 'react';
import './homepage.css';
import { PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from './Header';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastContainer,toast } from 'react-toastify';
import axios from 'axios';
import { Search,Mic,X } from "lucide-react";

const Homepage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
const [title,settitle]=useState('')
const [description,setDescription]=useState('')
const [tasktype,settasktype]=useState('')
const [searchvalue,setsearchvalue]=useState('')
const [searchResults,setSearchResults]=useState([])
const [showModel,setShowModel]=useState(false)
const token=localStorage.getItem('authToken')
const [isListening, setIsListening] = useState(false);

let recognition;

if("webkitSpeechRecognition" in window || "SpeechRecognition" in window){
  recognition=new (window.webkitSpeechRecognition || window.SpeechRecognition)();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = "en-US";
  recognition.onresult = (event) => {
      const speechText = event.results[0][0].transcript;
     setsearchvalue(speechText);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };
  } else {
    console.warn("Speech Recognition API is not supported in this browser.");
  }

async function searchTasks()
{
  try{
    const searchedTasks=await axios.post('http://localhost:4000/search-tasks',
    {searchvalue},
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
      
      
    })
    // console.log(searchvalue);
    setSearchResults(searchedTasks.data)
    setShowModel(true)
    
    
    
  }
  catch(error)
  {
    // console.log(error);
    
  }

}
async function deleteTask(task) {
  const taskid = task._id;
  try {
      const response = await axios.delete(`http://localhost:4000/delete-task/${taskid}`, {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      });

      // console.log(response.data);
      toast.success("Task deleted successfully! ✅");

      // Refresh tasks after deleting
      fetchTasks();

  } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task ❌");
  }
}


async function editTask(task){
  const taskid=task._id;
 try{
    const response=await axios.put('http://localhost:4000/edit-task',{taskid},{
     
      
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      
    })
    // console.log(response.data);
    
 }catch(error)
 {

 }
}


async function completeTask(task) {
  const taskid = task._id;

  try {
    const response = await axios.put(
      'http://localhost:4000/complete-task', 
      {taskid} ,  // ✅ Task ID should be in request body
      {
        headers: {  // ✅ Headers should be outside the body
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    );

    // console.log(response.data);
    toast.success("Task marked as completed! ✅");
    fetchTasks();

  }catch (error) {
    console.error("Error completing task:", error.response ? error.response.data : error.message);
    toast.error("Failed to complete task ❌");
}

}

async function fetchTasks(){
  try{
    const alltasks=await axios.get('http://localhost:4000/get-tasks',{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
      
      
    })
    //  console.log(alltasks.data);
    setTasks(alltasks.data)
    
  }
  catch(error)
  {
    // console.log(error);
    
  }
}
  useEffect(()=>{
    fetchTasks();

  },[])

  const addTask =async () => {
    
    if (!title || !description || !tasktype) {
      return toast.error("All fields are required! ❌"); // ✅ Basic validation
    }
    
    try {
      const response = await axios.post(
        'http://localhost:4000/add-task',
        {
          title,
          description,
          tasktype,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
    
      // console.log(response);
      
      // ✅ Show success message only after the request succeeds
      toast.success("Task added successfully! 🎉");
    
      // ✅ Clear input fields after successful submission (if using React state)
      // setTitle("");
      // setDescription("");
      // setTaskType("");
    fetchTasks();
    } catch (error) {
      // console.error("Task adding task:", error);
      const errorMessage = error.response?.data?.error || "Failed to add task.";
      toast.error(errorMessage);
    }
    
    
    }
  
    const handleKeyPress = (event) => {

      if (event.key === "Enter") {
          event.preventDefault(); // Prevent form submission (if inside a form)
          addTask(); // Call the addTask function
      }
  };
  const startListening = () => {
    if (recognition) {
      setIsListening(true);
      recognition.start();
    } else {
      alert("Your browser does not support speech recognition.");
    }
  };
   // Stop listening
const stopListening = () => {
if (recognition) {
  setIsListening(false);
  recognition.stop();
}
};
const resetSearch = () => {
  setsearchvalue("");
};

  return (
    <>
      <Header />
      <main className="main-content">
        <div className="task-summary">
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




        <div className="search-container">
        <div className="searchdiv">
      {/* Mic Button (Left Side) */}
      <Mic
        size={18}
        className={`mic-icon ${isListening ? "listening" : ""}`} // Add a class when listening
        onClick={isListening ? stopListening : startListening}
      />

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search Here"
        value={searchvalue}
        onChange={(e) => setsearchvalue(e.target.value)}
      />

      {/* Reset Button (Only Shows When Input Has Text) */}
      {searchvalue && (
        <X
          size={18}
          className="reset-icon"
          onClick={resetSearch}
        />
      )}

      {/* Search Icon */}
      <Search
        size={18}
        className="search-icon"
        onClick={searchTasks}
      />
    </div>
</div>

                {/* code to show  searched data */}
       {showModel &&( 
        <div className="modal-overlay" onClick={() => setShowModel(false)}>
           <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Searched Results</h2>
            {searchResults.length>0 ?(<div className='s-taskbox'>
                  {searchResults.map((task, index) => (
                    <div className='stask' key={index}>
                      <span><strong>Title</strong>:{task.title}</span> <br />
                      <span><strong>Type</strong>:{task.type}</span><br />
                      <p>Description:{task.description}</p>
                      <br />
                      <span>Added on:on :{Date(task.addedOn).toLocaleString()}</span>
                      <br />
                      <div className="task-card-buttons">
                      <button onClick={() => completeTask(task)}>Complete</button>
                  <button onClick={() => editTask(task)} disabled>Edit</button>
                  <button onClick={()=>{
                    deleteTask(task)
                  }}>Delete</button>
                      </div>
                    </div>
                  ))}
                </div>):(<p>No Tasks Found</p>
               )}
                <button onClick={() => setShowModel(false)}>Close</button>
           </div>
        </div>
        
        )}

        <p className="nt">Add New Task Here.</p>
        <div className="task-input-container">
          <div className="box">
            <input
              className="task-input"
              placeholder="Title"
              required
             name='title'
              onChange={(e) => settitle(e.target.value)} 
            />
            <br />
            <input
              className="task-input"
              placeholder="Description"
              required
              name='description'
              onChange={(e)=>{
                setDescription(e.target.value)
              }}
            />
            <br />
            <input type="text" className="task-input" placeholder="Task Type" required 
            name='tasktype' onChange={(e)=>{
                settasktype(e.target.value)
            }}   onKeyDown={handleKeyPress} 
            />
            <br />

            <div className="btndiv">
              <PlusCircle onClick={addTask} style={{ cursor: 'pointer' }} />
            
            </div>
          </div>
        </div>

        {/* Task List with Animation */}
        <div className="task-grid">
          <AnimatePresence>
            {tasks.filter((task)=> task.status==="pending")
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
                <p className="t-dis"> {task.description}</p>
                <div className="task-card-buttons">
                  <button onClick={() => completeTask(task)}>Complete</button>
                  <button onClick={() => editTask(task)} disabled>Edit</button>
                  <button onClick={()=>{
                    deleteTask(task)
                  }}>Delete</button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <ToastContainer position="top-center" autoClose={5000} theme="dark" />
      </main>
    </>
  );
};

export default Homepage;
