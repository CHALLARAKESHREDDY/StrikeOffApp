import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Axios from 'axios';
import './index.css'
 

function SignupPage(){

    const history=useNavigate()
    const [username,changeUsername]=useState("")
    const [password,changePassword]=useState("")
    const [emailAddress,changeEmailAddress]=useState("")



    const changeRouteToLoginPage=()=>{
        
        history('/login')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("kk")
      
        try {
            const response = await Axios.post('http://localhost:8001/tasks', {username:username, password: password,emailAddress:emailAddress});

            if (response.status === 200) {
              console.log('User registered successfully!');
              // You can also redirect the user to a login page or do other actions here.
            }
            if (response.status === 409 ){
              console.log('User with the same username already exists');
            }
            if (response.status === 400 ){
                console.log("Password is too short (minimum 6 characters)")
            }
            if(response.status === 407){
                console.log("emailAddress already exists");
            }
          } catch (error) {
            console.log('An error occurred. Please try again later.');
            // You can also log the error to the console for debugging.
            console.error('Error:', error);
          }
      };




    return(
        <div className="Signuppage-Container">
            <form className="signup-Form"  >
                <h1>Create Account</h1>
                <input type="text" placeholder='Email Adsress' onChange={(event)=>changeEmailAddress(event.target.value)} />
                <br />
                <input type="username" placeholder='Username' onChange={(event)=>changeUsername(event.target.value)} />
                    <br />
                <input type="password" placeholder='Password' onChange={(event)=>changePassword(event.target.value)}/>
                <br/>
                <button type="button" onClick={handleSubmit}>Signup</button>
                <p>Already have an account? <span className="Login-Text" onClick={changeRouteToLoginPage}>Log In</span> </p>
            </form>
        </div>
    )
}

export default SignupPage