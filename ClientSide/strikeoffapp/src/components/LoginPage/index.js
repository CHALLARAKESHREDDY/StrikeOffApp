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
      console.log(response.data)

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
    <section className="container">
    <div className="login-container">
        <div className="circle circle-one"></div>
        <div className="form-container">
          
            <h1 className="opacity">LOGIN</h1>
            <form>
                <input value={emailAddress} type="text" placeholder='Username' onChange={(event) => changeEmailAddress(event.target.value)}/>
                <input  value={password} type="password" placeholder='Password' onChange={(event) => changePassword(event.target.value)}/>
                <button className="opacity" onClick={onSubmitForm}>SUBMIT</button>
            </form>
            <div className="register-forget opacity">
                <a onClick={changeRouteToSignupPage} style={{cursor:"pointer"}}>SIGNUP</a>
                <a className="Signup">FORGOT PASSWORD</a>
            </div>
            <p className="errorMsgLogin">{errorMsg}</p>
        </div>
       
        <div className="circle circle-two"></div>
    </div>
    <div className="theme-btn-container"></div>
    </section>
  );
}

export default LoginPage;



