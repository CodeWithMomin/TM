import React, { useState, useEffect } from "react";
import "./Profile.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function getProfile() {
      try {
        const token = localStorage.getItem('authToken');
        
        const response = await axios.get('http://localhost:4000/profile', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        
       
        setUserData(response.data); // Set the user data in state
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Error fetching profile');
      }
    }

    getProfile();
  }, []);
  
  const logout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <div className="parent">
      <div className="profile-container">
        {/* Error Handling */}
        {error && <p className="error-message">{error}</p>}
        
        {/* User Info */}
        <div className="profile-header">
          <h2>{userData.name || 'User Name'}</h2>
          <p>{userData.role || 'User Role'}</p>
        </div>

        {/* Task Stats */}
        <div className="profile-stats">
          <div className="stat-box">
            <h3>{userData.tasksCompleted || 0}</h3>
            <p>Completed Tasks</p>
          </div>
          <div className="stat-box">
            <h3>{userData.tasksPending || 0}</h3>
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
