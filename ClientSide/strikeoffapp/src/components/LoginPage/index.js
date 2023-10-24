import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import './index.css';

function LoginPage() {
  const [emailAddress, changeEmailAddress] = useState('');
  const [password, changePassword] = useState('');
  const [errorMsg, changeErrormsg] = useState(null);
  const history = useNavigate();

  const onSubmitForm = async (event) => {
    event.preventDefault();

    if (!password || !emailAddress) {
      changeErrormsg('All fields are required');
      return;
    }

    try {
      let response = await axios.post('http://localhost:3007/login', {
        username: emailAddress,
        password: password,
      });

      if (response.data.resultMsg === 'Login Successfull') {
        await Cookies.set('jwtToken', response.data.jwtToken, { expires: 3 });
        await changeErrormsg('Your JWT has been set! Now you can start Saving');
        await history('/home');
      } else {
        changeErrormsg(response.data);
      }
    } catch (e) {
      changeErrormsg(e.message);
    }
  }

  const changeRouteToSignupPage = () => {
    history('/signup');
  }

  return (
    <div className="Loginpage-Container">
      <form className="Login-Form">
        <h1>Welcome Back!</h1>
        <input className="Login-Input" value={emailAddress} type="text" placeholder='Username' onChange={(event) => changeEmailAddress(event.target.value)} />
        <br />
        <input  className="Login-Input" value={password} type="password" placeholder='Password' onChange={(event) => changePassword(event.target.value)} />
        <br /> 
        <button type="button" onClick={onSubmitForm} classNmae="Login-button">Login</button>
        <p>Don’t have an account? <span className="Signup-Text" onClick={changeRouteToSignupPage}>Sign Up</span></p>
        <p className="errorMsgLogin">{errorMsg}</p>
      </form>
    </div>
  );
}

export default LoginPage;