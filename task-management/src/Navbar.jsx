import { useState } from "react";
import "./App.css"; // Import CSS file
import { Link } from "react-router-dom";
import { ToastContainer,Bounce,toast } from "react-toastify";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
       
        {/* Menu Icon */}
        <button className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>

        {/* Navigation Links */}
        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
  <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
  <li><Link to="/register" onClick={() => {
    setIsOpen(false)
    localStorage.removeItem('authToken')
  }
}>Register</Link></li>
  <li><Link to="/login" onClick={() => {
    setIsOpen(false)
    toast.success('Log Out Successfully ')
    localStorage.removeItem('authToken')
   
  }}>Login</Link></li>
  <li><Link to="/profile" onClick={() => setIsOpen(false)}>Profile</Link></li>
</ul>
      </div>
      <ToastContainer position="top-center" autoClose={5000} theme="dark" />
    </nav>
  );
};

export default Navbar;
