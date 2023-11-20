import { useState } from 'react';
import {useNavigate } from 'react-router-dom'

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
            console.log(response)
            if (response.data === 'OTP Sent to your registered email id'){
                localStorage.setItem("emailAddress",email)
                setMessage('Email sent successfully. Please check your email for instructions.');
                setError('');
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
            </div>
        </div>
    )
}

export default ForgotPassword;
