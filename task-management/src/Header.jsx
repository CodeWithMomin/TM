import React, { useState } from 'react'
import './App.css'
import Navbar from './Navbar'
import { Moon,Sun } from 'lucide-react'
import { useEffect } from 'react'
import ThemeToggle from './OtherPages/ThemeToggle'
const Header = () => {
  // const [toggle,setToggle]=useState(() => {
  //   return localStorage.getItem("theme") !== "light";
  // })
  // // Apply theme whenever toggle changes
  // useEffect(() => {
  //   if (toggle) {
  //     document.body.classList.remove("light-mode");
  //     localStorage.setItem("theme", "dark");
  //   } else {
  //     document.body.classList.add("light-mode");
  //     localStorage.setItem("theme", "light");
  //   }
  // }, [toggle]);
  return (
    <div className='header'>
    <div className="logo">
      <img src="src/assets/product.png" alt="Task Management Logo" />
      <p>Task Management</p>
    </div>
    <ThemeToggle/>
    <Navbar />
    {/* <div className="darkmodediv">
      {toggle ? (
        <Sun className='mode' onClick={() => setToggle(false)} size={24} />
      ) : (
        <Moon className='mode' onClick={() => setToggle(true)} size={24} />
      )}
    </div> */}
    
  </div>
  )
}

export default Header