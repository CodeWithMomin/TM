import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Homepage from './Homepage'
import './App.css'
import Register from './Register'
import Login from './Login'
import Profile from './Profile'
import Completed from './OtherPages/Completed.jsx'
import Pending from './OtherPages/Pending'
import Total from './OtherPages/Total'
const App = () => {
  const isAuthenticated = () => {
    return localStorage.getItem("authToken") !== null; // Check if token exists
  };
  const ProtectedRoute = ({ children }) => { 
    // here children is the component inside protected Route
    return isAuthenticated() ? children : <Navigate to="/login" />;
    // <Navigate> is a component from React Router v6 used to redirect users from one route to another.
  };
  return (
    <div>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<ProtectedRoute><Homepage/></ProtectedRoute>} />
        {/* <Route path='/' element={<Homepage/>}/> */}
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/profile' element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
        <Route path='/completed' element={<Completed/>}/>
        <Route path='/total' element={<Total/>}/>
        <Route path='/pending' element={<Pending/>}/>
        {/* Contact Page */}
        {/* <Routes path="/contact" element={<Contact />} /> */}
      </Routes>
    </div>
  )
}

export default App