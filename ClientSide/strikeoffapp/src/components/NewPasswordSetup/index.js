import axios from 'axios';
import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import { PiKeyReturnFill } from "react-icons/pi";
import './index.css';

function NewPasswordSetup() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessage] = useState('');
  const [error, setError] = useState('');

  const validatePassword = () => {
    if (password !== confirmPassword) {
      return false;
    }
    return true;
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const enableSubmitButton = () => {
    setIsLoading(false);
  };

  const disableSubmitButton = () => {
    setIsLoading(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validatePassword() || !password || !confirmPassword) {
      setError('Passwords do not match!');
      setMessage('');
      return;
    } else {
      try {
        const emailAddress = localStorage.getItem('emailAddress');
        const response = await axios.put('https://strikeout-serverside.onrender.com/update-password', { password, emailAddress });
  
        
        if(response.data==="Please enter a password of atleast 6 characters"){
          setMessage('');
          setError('The password must be at least 6 characters long!')
        }
        
        else if (response.status === 200) {
          setError('');
          setMessage('Password updated successfully!');
          setPassword("")
          setConfirmPassword("")
        } 
        else {
          setMessage('');
          setError('Password update failed');
        }
    
      } catch (e) {
        setMessage('');
        setError(e.message);
      }
    }

    disableSubmitButton();

    // Simulating the AJAX call
    setTimeout(() => {
      enableSubmitButton();
    }, 1000);
  };

  return (
    <div className="mainDiv">
      <div className="cardStyle">
        <form onSubmit={handleSubmit} name="signupForm" id="signupForm">

          <h2 className="formTitle">Reset Your Password</h2>

          <div className="inputDiv">
            <label className="input-Label" htmlFor="password">New Password</label>
            <div className="passwordInputContainer">
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                id="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span onClick={togglePasswordVisibility} className="toggleIcon">
                {isPasswordVisible ? 'Hide' : 'Show'}
              </span>
            </div>
          </div>

          <div className="inputDiv">
            <label className="input-Label" htmlFor="confirmPassword">Confirm Password</label>
            <div className="passwordInputContainer">
              <input
                type={isConfirmPasswordVisible ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span onClick={toggleConfirmPasswordVisibility} className="toggleIcon">
                {isConfirmPasswordVisible ? 'Hide' : 'Show'}
              </span>
            </div>
          </div>

          <div className="buttonWrapper">
            <button type="submit" className="submitButton pure-button pure-button-primary" disabled={isLoading}>
              Submit
            </button>
            {messages && <p style={{ color: 'green', margin: '20px' }}>{messages}</p>}
            {error && <p style={{ color: 'red', margin: '20px' }}>{error}</p>}
          </div>
        </form>
        <Link style={{width:"95%",alignSelf:"flex-end",display:"flex",justifyContent: "end",alignItems:"center",textDecoration:"none"}} to="/login"> <p style={{color:"#9999cc"}}>Login</p><PiKeyReturnFill style={{color:"#9999cc"}} />
</Link>
      </div>
      
    </div>
  );
}

export default NewPasswordSetup;

