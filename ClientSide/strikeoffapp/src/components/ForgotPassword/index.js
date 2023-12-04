import { useState } from 'react';
import {Link, useNavigate } from 'react-router-dom'
import { PiKeyReturnFill } from "react-icons/pi";


import axios from 'axios'; // It should be 'axios' instead of 'Axios'
import './index.css';

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const history=useNavigate()

    const emailSubmit = async () => {
        try {
            const response = await axios.post("https://strikeout-serverside.onrender.com/forgotPassword-Email-Verification", { email });
        
            if (response.data === 'OTP Sent to your registered email id'){
                localStorage.setItem("emailAddress",email)
                history('/forgot-OTP')
             
                
            } else if(response.data==="User not Registered"){
                setMessage('');
                setError('Failed sending OTP, User not Registered');
            }
        } catch (error) {
            setMessage('');
            setError('An error occurred. Please try again later.');
        }
    }

    return (
        <div className="Forgot-Container">
          
            <div className="Small-Container">
               
           
                <p className="forgot-email-para">Verify your Email</p>
                <input type="email" onChange={(event) => setEmail(event.target.value)} />
                <button type="button" onClick={emailSubmit} className="forgot-email-button">Continue</button>
                {message && <p style={{ color: 'green' }}>{message}</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <Link style={{alignSelf:"flex-end",display:"flex",justifyContent: "end",alignItems:"center",textDecoration:"none"}} to="/login"> <p style={{color:"#9999cc"}}>Login</p><PiKeyReturnFill style={{color:"#9999cc"}} />
</Link>
            </div>
        </div>
    )
}

export default ForgotPassword;
