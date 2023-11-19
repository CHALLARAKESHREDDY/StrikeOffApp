import Axios from 'axios';
import {useNavigate } from 'react-router-dom'
import { css } from '@emotion/react';
import React, { useState,useEffect} from 'react';


import OtpInput from "react-otp-input";
import "./index.css";


// Define responsive styles using Emotion's css function
const responsiveInputStyles = css`
  width: 54px;
  height: 54px;
  font-size: 20px;
  color: #000;
  font-weight: 400;
  caret-color: blue;

  @media (max-width: 550px) {
    width: 300px;
    height: 35px;
    /* Additional responsive styles */
  }

  @media (min-width: 1200px) {
    width: 8%;
    height: 4vh;
    margin: 0 3%;
    /* Additional styles for larger screens */
  }
`;

// Merging the styles based on screen sizes




function OTPAuthenticationForgotPassword() {
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [otp, setOtp] = useState("");
  const history=useNavigate()


  const handleChange = (otp) => setOtp(otp);

  useEffect(() => {
    function handleResize() {
      setIsSmallScreen(window.innerWidth < 550);
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);





  const handleSubmit = async () => {
    setLoading(true);
    

    try {
      const response = await Axios.post('http://localhost:3007/verify-otp-forgotPassword', { otp});
  
      if (response.data === 'Correct OTP') {
       
        setErrorMsg('OTP Verfication Successfully');
        history('/New-Password-Setup')
      } else {
        setErrorMsg(response.data);
      }
    } catch (e) {
      setErrorMsg('An error occurred while verifying OTP.');
    } finally {
      setLoading(false);
    }
  };

  return ( 
    <div className="OTP-Container">
    <div className="App">
      <h1 className="OTP-Heading">OTP Authentication</h1>
      <p className="OTP-Paragraph">OTP has been sent to your mail</p>
      <OtpInput
        value={otp}
        className="OTP-Box"
        onChange={handleChange}
        numInputs={6}
        separator={<span style={{ width: "10px" }}></span>}
        isInputNum={true}
        shouldAutoFocus={true}
        inputStyle={{
          border: "1px solid transparent",
          borderRadius: "8px",
          width: isSmallScreen ? '30px' : '50px', // Modify the width based on screen size
          height: isSmallScreen ? '30px' : '50px', // Modify the height based on screen size
          fontSize:isSmallScreen ? '13px' : '20px',
          color: "#000",
          fontWeight: "400",
          caretColor: "blue",
        }}
        focusStyle={{
          border: "1px solid #CFD3DB",
          outline: "none"
        }}
      />
      <button onClick={handleSubmit} className="OTP-Button" type="button">Continue</button>
      {errorMsg === '' ? null : <p style={{color:"red"}}>{errorMsg}</p>}
      
    </div>

    
    </div>
  );
}

export default OTPAuthenticationForgotPassword;
