import React, { useState, useEffect } from "react";
import "./Profile.css";
import { useNavigate } from 'react-router-dom';
const Profile = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    role: "Project Manager",
    tasksCompleted: 45,
    tasksPending: 10,
    lastLogin: "2 days ago",
  });
  const navigate=useNavigate()
const logout=()=>{
  localStorage.removeItem('authToken');
    navigate('/login')
}
  return (
    <div className="parent">
        <div className="profile-container">
      {/* User Info */}
      <div className="profile-header">
        
        <h2>{user.name}</h2>
        <p>{user.role}</p>
      </div>

      {/* Task Stats */}
      <div className="profile-stats">
        <div className="stat-box">
          <h3>{user.tasksCompleted}</h3>
          <p>Completed Tasks</p>
        </div>
        <div className="stat-box">
          <h3>{user.tasksPending}</h3>
          <p>Pending Tasks</p>
        </div>
      </div>

      {/* Settings */}
      <div className="profile-settings">
        <button disabled>Update Password</button>
        
        <button className="logout-btn" onClick={logout}>Logout</button>
      </div>
    </div>
    </div>
  );
};

export default Profile;
