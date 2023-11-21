import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import './index.css';

function SignupPage() {
  const history = useNavigate();
  const [username, changeUsername] = useState('');
  const [password, changePassword] = useState('');
  const [emailAddress, changeEmailAddress] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, changeErrormsg] = useState('');

  const changeRouteToLoginPage = () => {
    history('/login');
  };

  const changeRouteToOTPPage = () => {
    history('/OTPPage');
  };

  const validateForm = () => {
    if (!username || !password || !emailAddress) {
      changeErrormsg('All fields are required');
      return false;
    } else if (!emailAddress.endsWith('gmail.com')) {
      changeErrormsg('Invalid Email Address');
      return false;
    } else if (password.length < 6) {
      changeErrormsg('Password is too short (minimum 6 characters).');
      return false;
    } else if (username.length < 6) {
      changeErrormsg('Username should have more than 5 characters');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const response = await Axios.post('https://strikeout-serverside.onrender.com/tasks', {
        username: username,
        password: password,
        emailAddress: emailAddress,
      });

      if (response.data === 'OTP Sent to your registered email id') {
        changeRouteToOTPPage();
      } else {
        changeErrormsg(response.data);
      }
    } catch (error) {
      console.error('An error occurred. Please try again later.');
      console.error('Error:', error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card_title">
          <h1>Create Account</h1>
          <span style={{ fontSize: '10px' }}>
            Already have an account?{' '}
            <a onClick={changeRouteToLoginPage} style={{ cursor: 'pointer', color: '#0f3460', fontWeight: '500' }}>
              SignIn
            </a>
          </span>
        </div>
        <div className="form">
          <form action="/register" method="post">
            <input type="text" name="username" id="username" placeholder="UserName" value={username} onChange={(event) => changeUsername(event.target.value)} />
            <input value={emailAddress} type="email" placeholder="Email Address" onChange={(event) => changeEmailAddress(event.target.value)} id="email" />
            <div className="password-container">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                id="password"
                value={password}
                onChange={(event) => changePassword(event.target.value)}
              />
              <span className="password-toggle-signup" onClick={togglePasswordVisibility}>
                {showPassword ? 'Hide' : 'Show'}
              </span>
            </div>
            <button type="button" onClick={handleSubmit}>
              Sign Up
            </button>
          </form>
        </div>
        <div className="card_terms">{errorMsg.length > 1 ? <p className="errorMsg">{errorMsg}</p> : null}</div>
      </div>
    </div>
  );
}

export default SignupPage;


