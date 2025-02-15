import React from 'react'
import './App.css'
import Navbar from './Navbar'
const Header = () => {
  return (
    <div className='header'>
        <div className="logo">
            <img src="src\icons\product.png" alt="" />
            <p>Task Management</p>
        </div>
        <Navbar/>
    </div>
  )
}

export default Header