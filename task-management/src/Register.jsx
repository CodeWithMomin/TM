import React, { useState } from 'react'
import Header from './Header'
import { ClipLoader, ScaleLoader } from 'react-spinners'
const Register = () => {
  const [name,setname]=useState("")
  const [email,setemail]=useState("")
  const [password,setpassword]=useState("")
  const [role,setrole]=useState("")
  const [loading ,setloading]=useState(false)
 
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page reload
    // console.log("Submitted:", { name, email, password });
    const userData = { name, role,email, password };
    setloading(true)
    setTimeout(() => {
      setloading(false)
     }, 5000);
    console.log(userData);
    
    // You can add form validation or send data to an API here
    alert("Form submitted successfully!");
  };
  return (
    <div>
      <Header/>
      
      <div className="regformcontainer">
       
  <form>
    {/* Name Field */}
    <p>Create Account</p>
    <input type="text" name="name" placeholder="Full Name" required onChange={(e)=>{
            setname(e.target.value)
    }} />
    <br />

    <input type="text" name="role" placeholder="Role" required onChange={(e) => setrole(e.target.value)} />
    <br />
    {/* Email Field */}
    <input type="email" name="email" placeholder="Email" required onChange={(e) => setemail(e.target.value)}/>
    <br />

    {/* Password Field */}
    <input type="password" name="password" placeholder="Password" required onChange={(e) => setpassword(e.target.value)} />
    <br />

    {/* Submit Button */}
    <div className="btndiv">
    <button 
  type="submit" 
  className="contact-button" 
  disabled={loading} 
  onClick={handleSubmit}
>
  {loading ? (
    <div className="loader-container">
     
      <ScaleLoader
        color="rgb(7, 7, 7)"
        loading={loading}
        // cssOverride={override}
        size={140}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  ) : (
    "Sign Up"
  )}
</button>

    </div>
  </form>
</div>

    </div>
  )
}

export default Register