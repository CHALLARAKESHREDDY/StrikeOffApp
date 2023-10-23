import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Axios from 'axios';
import './index.css'
 

function SignupPage(){

    const history=useNavigate()
    const [username,changeUsername]=useState("")
    const [password,changePassword]=useState("")
    const [emailAddress,changeEmailAddress]=useState("")
    const [errorMsg,changeErrormsg]=useState("")



    const changeRouteToLoginPage=()=>{
        
        history('/login')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!username || !password || !emailAddress) {
            changeErrormsg('All fields are required');
            return;
          }

          else if (emailAddress.endsWith("gmail.com")===false){
            changeErrormsg("Invalid Email Address")
          }
          else if(password.length < 6) {
            changeErrormsg('Password is too short (minimum 6 characters).');
            return;
          }

          else if (username.length<6){
            changeErrormsg("Username should have more than 5 charecters")
            return ;
          }

          else{
      
      
        try {
            const response = await Axios.post('http://localhost:3007/tasks', {username:username, password: password,emailAddress:emailAddress});
           
            changeErrormsg(response.data)
          
          
          } catch (error) {
            console.log('An error occurred. Please try again later.');
            // You can also log the error to the console for debugging.
            console.error('Error:', error);
          }
        }
      };
 



    return(
        <div className="Signuppage-Container">
            <form className="signup-Form"  >
                <h1>Create Account</h1>
                <input className="Login-Input" value={emailAddress} type="email" placeholder='Email Adsress' onChange={(event)=>changeEmailAddress(event.target.value)} />
                <br />
                <input  className="Login-Input" value={username} type="username" placeholder='Username' onChange={(event)=>changeUsername(event.target.value)} />
                    <br />
                <input className="Login-Input" value={password} type="password" placeholder='Password' onChange={(event)=>changePassword(event.target.value)}/>
                <br/>
                <button type="button" onClick={handleSubmit}>Signup</button>
                <p>Already have an account? <span className="Login-Text" onClick={changeRouteToLoginPage}>Log In</span> </p>
                {errorMsg.length>1? <p className="errorMsg">{errorMsg}</p>:null} 
            </form>
          
        </div>
    )
}

export default SignupPage