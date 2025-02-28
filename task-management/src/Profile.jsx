import React, { useState, useEffect } from "react";
import "./Profile.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from "./Header";
import { Eye, EyeOff } from "lucide-react";

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [error, setError] = useState('');
  const [showModel,setShowModel]=useState(false)
  const [showPassword,setShowPassword]=useState(false)
  const [newPassword,setNewPassword]=useState('')
  const [confirmPassword,setConfirmPassword]=useState('')
  const [triggerEffect, setTriggerEffect] = useState(false); // State to control useEffect

  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000"; 
    useEffect(()=>{
      if(!triggerEffect) return;

      async function changePassword(){
        if(newPassword === confirmPassword){
       try{
         const response=await axios.post(`${API_BASE_URL}/change-password`,{
          newPassword
        }
      ,{
        headers:{
          'Content-Type':'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      console.log(response.data)
      }
      catch(error){
          console.log(error.message)
      }
       }
       else{
        alert("password not same")
      }
      }
      changePassword();
    },[triggerEffect])
   
  
  useEffect(() => {
    async function getProfile() {
      try {
        
        
        const response = await axios.get('`${API_BASE_URL}/profile`', {
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
      <Header/>
      <div className="profile-container">
        {/* Error Handling */}
        {error && <p className="error-message">{error}</p>}
        
        {/* User Info */}
        <div className="profile-header">
          <h2>{userData.name || 'User Name'}</h2>
          <p>{userData.role || 'User Role'}</p>
          <span>{userData.email}</span>
        </div>

        {/* Task Stats */}
        <div className="profile-stats">
          <div className="stat-box">
          <h3>{(userData.tasks || []).filter(task => task.status === "completed").length}</h3>

            <p>Completed Tasks</p>
          </div>
          <div className="stat-box">
          <h3>{(userData.tasks || []).filter(task => task.status != "completed").length}</h3>
            <p>Pending Tasks</p>
          </div>
        </div>

        {/* Settings */}
        <div className="profile-settings">
          {showModel && (
            <div className="changepassworddiv">
             <div className="np">
             <input type={showPassword?"text":"password"} placeholder="Enter New Passoword" onChange={(e)=> setNewPassword(e.target.value)} required /> {showPassword?<EyeOff className="Eye" onClick={()=>{
                            setShowPassword(false)
             }} size={20}/>:<Eye className="Eye" size={20} onClick={()=>{
              setShowPassword(true)
             }} />}
             </div>
              <input type="password" placeholder="Confirm Password"  onChange={(e)=>setConfirmPassword(e.target.value)} required/>
              <button className="changebtn" onClick={()=>{
                setTriggerEffect((prev)=>!prev)
                setShowModel(false)
              }}>Change</button>

            </div>
          )}
          {!showModel && (<button className="updateButton" onClick={()=>{
            setShowModel(true)
          }}>Update Password</button>)}
          <button className="logout-btn" onClick={logout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
