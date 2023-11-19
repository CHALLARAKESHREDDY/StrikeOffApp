import axios from 'axios';
import React, { useState } from 'react';
import './index.css'

function NewPasswordSetup() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessage] = useState("");
  const [error, setError] = useState("");
  

  const validatePassword = () => {
    if (password !== confirmPassword) {
      return false;
    }
    return true;
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
      setError('passwords do not match!');
      setMessage('');
      return;
    } else {
      try {
        const emailAddress = localStorage.getItem('emailAddress');
        const response = await axios.put('http://localhost:3007/update-password', { password, emailAddress });
  
        
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
         

          <h2 className="formTitle">
           Reset Your Password
          </h2>

          <div className="inputDiv">
            <label className="input-Label" htmlFor="password">New Password</label>
            <input type="password" id="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div className="inputDiv">
            <label className="input-Label" htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>

          <div className="buttonWrapper">
            <button type="submit" className="submitButton pure-button pure-button-primary" disabled={isLoading}>
                            Submit
            </button>
            {messages && <p style={{ color: 'green',margin:"20px" }}>{messages}</p>}
                {error && <p style={{ color: 'red',margin:"20px"}}>{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewPasswordSetup;
