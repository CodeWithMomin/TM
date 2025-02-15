import React, { useState } from 'react';
import './App.css';
import Header from './Header';
import { ScaleLoader } from 'react-spinners';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading ,setloading]=useState(false)

  const handlebtnclk = async (e) => {
    e.preventDefault(); // Prevents form reload
    setloading(true);

    try {
        await axios.post('http://localhost:4000/login', {
            email,
            password
        });
        console.log("success");
      //  / Set loading to false on success
      setTimeout(() => {
        setloading(false);
      }, 1000);
    } catch (error) {
        console.log("failure");
        setloading(false); // Set loading to false on error
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
            <button type="submit">  {loading ? (
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
                "Sign In"
              )}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
