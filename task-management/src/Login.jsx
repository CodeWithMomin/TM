import React, { useState } from 'react';
import './App.css';
import Header from './Header';
import { ScaleLoader } from 'react-spinners';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlebtnclk = async (e) => {
    e.preventDefault(); // Prevents form reload
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:4000/login', {
        email,
        password
      });

      const token = response.data.token;
      // Check if token exists
      if (token) {
        localStorage.setItem('authToken', token);
        toast.success("Redirecting🎉");

        // Add a slight delay before navigating to allow the toast to show
        setTimeout(() => {
          navigate('/');
        }, 1000);  // Wait for 1 second before redirecting
      } else {
        toast.error("Token not received");
      }
      
    } catch (error) {
      console.log("failure");
      toast.error("Invalid Credentials 😞"); // Display error toast
    } finally {
      setLoading(false); // Set loading to false after operation
    }
  };

  return (
    <div>
      <Header />
      <div className="regformcontainer">
        <form onSubmit={handlebtnclk}>
          <p>Sign In</p>

          {/* Email Field */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />

          {/* Password Field */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />

          {/* Submit Button */}
          <div className="btndiv">
            <button type="submit">
              {loading ? (
                <div className="loader-container">
                  <ScaleLoader
                    color="rgb(7, 7, 7)"
                    loading={loading}
                    size={140}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer position="top-center" autoClose={5000} theme="dark" />
    </div>
  );
};

export default Login;
