import React, { useState } from 'react'
import Header from './Header'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { ClipLoader, ScaleLoader } from 'react-spinners'
import { useNavigate } from 'react-router-dom';
import { Eye,EarOff, EyeOff, Turtle } from 'lucide-react';
const Register = () => {
  const [name,setname]=useState("")
  const [email,setemail]=useState("")
  const [password,setpassword]=useState("")
  const [role,setrole]=useState("")
  const [loading ,setloading]=useState(false)
  const [showPassword,setShowPassword]=useState(false)
  
 const navigate=useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page reload
    // console.log("Submitted:", { name, email, password });
    if (!name || !role || !email || !password) {
      return toast.error("All fields are required! ❌"); // ✅ Basic validation
      
    }
    const userData = { name, role,email, password };
    setloading(true)
    // setTimeout(() => {
    //   setloading(false)
    //  }, 5000);
    // console.log(userData);
    const response=await axios.post('https://tm-momin-zahoors-projects.vercel.app/register',{
      name,
      email,
      role,
      password
    }).then(()=>{
      // console.log("success");
      toast.success("Registration  successfull! 🎉");
      
      setTimeout(() => {
        setloading(false);
        navigate('/login')
      }, 1000);
      
    })
    .catch(()=>{
      // console.log("failure");
      toast.error("Something went wrong! 😞"); // ✅ Catch error toast
      setloading(false);
    })
    // You can add form validation or send data to an API here
    // alert("Form submitted successfully!");
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
    <div className="passworddiv">
  <input
    type={showPassword ? "text" : "password"}
    name="password"
    placeholder="Password"
    required
    onChange={(e) => setpassword(e.target.value)}
  />
  {showPassword ? (
    <EyeOff
      className="Eye"
      size={20}
      onClick={() => setShowPassword((prev)=>!prev)}
    />
  ) : (
    <Eye
      className="Eye"
      size={20}
      onClick={() => setShowPassword((prev)=>!prev)} 
    />
  )}
</div>

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
<ToastContainer position="top-center" autoClose={5000} theme="dark" />
    </div>
  )
}

export default Register