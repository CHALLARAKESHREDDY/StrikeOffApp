import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import LeftSideBar from "../LeftSideBar";
import  axios  from "axios";
import './index.css'

const ChatOneSection = () => {
  const location = useLocation();
  const { username } = location.state || {};


  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await axios.get(`http://localhost:3007/chatWith/?User=${"rakesh1234"}`);
        
      } catch (e) {
        
        console.log("error", e.message);
      }
    };

    fetchData(); // Call the asynchronous function immediately

    // Optional cleanup function
    return () => {
      // Any cleanup code can go here
    };
  }, [username,]);
  
  // Dependency array to re-run the effect when 'username' changes

  if (Cookies.get("jwtToken") === undefined) {
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <div className="Home-Container">
      <LeftSideBar />
     
        <div className="Middle-Container">
          
          <h1 style={{ fontSize: "22px" }}>Chat With {username}</h1>
         
    </div>
    <div className="Right-Bar">
        <h1 style={{ fontSize: "22px" }}>Chat Section<br /> Coming Soon</h1>
      </div>
      </div>
  
  );

};

export default ChatOneSection;
