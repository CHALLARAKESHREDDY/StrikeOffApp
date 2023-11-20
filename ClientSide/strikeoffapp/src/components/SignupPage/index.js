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

    const changeRouteToOTPPage=()=>{
      history("/OTPPage")
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
            const response = await Axios.post('https://strikeout-serverside.onrender.com/tasks', {username:username, password: password,emailAddress:emailAddress});
          
            if (response.data==="OTP Sent to your registered email id"){
                 changeRouteToOTPPage()
                 changeErrormsg(response.data)

               
            }else{
              changeErrormsg(response.data)
            }
           
            
          
          
          } catch (error) {
            console.log('An error occurred. Please try again later.');
            // You can also log the error to the console for debugging.
            console.error('Error:', error);
          }
        }
      };
 



    return(
      <div className="container">
         
<div className="card">
  <div className="card_title">
    <h1>Create Account</h1>
    <span style={{fontSize:"10px"}}>Already have an account? <a onClick={changeRouteToLoginPage} style={{cursor:"pointer",color:"#0f3460",fontWeight:"500"}}>SignIn</a></span>
  </div>
  <div className="form">
  <form action="/register" method="post">
    <input type="text" name="username" id="username" placeholder="UserName" value={username}  onChange={(event)=>changeUsername(event.target.value)} />
    <input  value={emailAddress} type="email" placeholder='Email Address' onChange={(event)=>changeEmailAddress(event.target.value)} id="email" />
    <input type="password" name="password" placeholder="Password" id="password"  value={password}  onChange={(event)=>changePassword(event.target.value)} />
    <button type="button" onClick={handleSubmit} >Sign Up</button>
    </form>
     
  </div>
  <div className="card_terms">
  {errorMsg.length>1? <p className="errorMsg">{errorMsg}</p>:null} 
  </div>
</div>
</div>
 
    )
}

export default SignupPage


