import React, { useState } from 'react';
import './homepage.css';
import { PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from './Header';
import { motion, AnimatePresence } from 'framer-motion';

const Homepage = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Task 1', completed: false },
    { id: 2, title: 'Task 2', completed: true },
    { id: 3, title: 'Task 3', completed: false },
  ]);

  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim()) {
      const newId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
      setTasks([...tasks, { id: newId, title: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const toggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const editTask = (index) => {
    setNewTask(tasks[index].title);
    deleteTask(index);
  };

  const deleteTask = (index) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
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
            <Link to="/completed">Completed: {tasks.filter(t => t.completed).length}</Link>
          </div>
          <div className="card">
            <Link to="/pending">Pending: {tasks.filter(t => !t.completed).length}</Link>
          </div>
        </div>
        <p className="nt">Add New Task Here.</p>
        <div className="task-input-container">
          <div className="box">
            <input
              className="task-input"
              placeholder="Title"
              required
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)} 
            />
            <br />
            <input
              className="task-input"
              placeholder="Description"
              required
            />
            <br />
            <input type="text" className="task-input" placeholder="Task Type" required />
            <br />

            <div className="btndiv">
              <PlusCircle onClick={addTask} style={{ cursor: 'pointer' }} />
            
            </div>
          </div>
        </div>

        {/* Task List with Animation */}
        <div className="task-grid">
          <AnimatePresence>
            {tasks.map((task, index) => (
              <motion.div
                key={task.id}
                className={`task-card ${task.completed ? 'completed' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6}}

              >
                <span>{task.title}</span>
                <p className="t-dis"> Locks drag direction into the soonest detected direction. For example, if the component is moved more on the x axis than y axis before the drag gesture kicks in, it will only drag on the x axis for the remainder of the gesture.</p>
                <div className="task-card-buttons">
                  <button onClick={() => toggleTask(index)}>Complete</button>
                  <button onClick={() => editTask(index)}>Edit</button>
                  <button onClick={() => deleteTask(index)}>Delete</button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>
    </>
  );
};

export default Homepage;
