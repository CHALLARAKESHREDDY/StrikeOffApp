import {useState,useEffect} from 'react'
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import LeftSideBar from "../LeftSideBar";
import MobileNavbar from "../MobileViewNavbar";

function MyChatSection(){
    const [mobileMode, setMobileMode] = useState(window.innerWidth <= 600)
    useEffect(() => {

        const handleResize = () => {
          setMobileMode(window.innerWidth <= 600);
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

      
  if (Cookies.get("jwtToken") === undefined) {
    return <Navigate to="/login" replace={true} />;
  }
    
    return(
        <div className="Home-Container">
         {mobileMode ? (
        <MobileNavbar
         chatsPage={true}
        
        />
      ) : (
        <LeftSideBar icon={"message"}/>
      )}
       <div className="Middle-Container">
            <div>
                <h1 style={{fontSize:"25px", fontWeight:700}}>My Chats Coming Soon</h1><hr/>
            </div>
          </div>
          <div className="Right-Bar">
        <h1 style={{ fontSize: "22px" }}>Chat Section<br /> Coming Soon</h1>
      </div>
     </div>)}


export default MyChatSection;