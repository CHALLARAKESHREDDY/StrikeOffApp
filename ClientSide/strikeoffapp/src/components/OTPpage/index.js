import Axios from 'axios';

import { css } from '@emotion/react';
import React, { useState,useEffect} from 'react';


import OtpInput from "react-otp-input";
import {FcApproval} from 'react-icons/fc' 
import "./styles.css";


// Define responsive styles using Emotion's css function

// Merging the styles based on screen sizes




function OTPAuthentication() {
  const [errorMsg, setErrorMsg] = useState('');
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [otp, setOtp] = useState("");
  const [successView,setSucessView]=useState(false)


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
  
    

    try {
      const response = await Axios.post('https://strikeout-serverside.onrender.com/verify-otp', { otp});
    
      if (response.status===200) {
        setSucessView(true)
        setErrorMsg('SignedUp Successfully');
      } else {
        setErrorMsg(response.data);
      }
    } catch (e) {
      setSucessView(false)
      setErrorMsg('An error occurred while verifying OTP.');
    }
  };

  return (
    <div className="OTP-Container">
    { successView ?<div style={{textAlign:"center"}}> <FcApproval style={{fontSize:"50px"}}/><p style={{color:"green"}}>{errorMsg}</p></div>:<div className="App">
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
      <button onClick={handleSubmit} className="OTP-Button">Submit</button>
      {errorMsg === '' ? null : <p style={{color:"red"}}>{errorMsg}</p>}
      
    </div> }

    
    </div>
  );
}

export default OTPAuthentication;

