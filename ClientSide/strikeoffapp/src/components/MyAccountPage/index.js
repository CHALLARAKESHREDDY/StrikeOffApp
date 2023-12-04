import {useState,useEffect} from 'react'
import LeftSideBar from "../LeftSideBar";
import MobileNavbar from "../MobileViewNavbar";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { FcBusinessman } from 'react-icons/fc';

function MyAccountSection(){
const [mobileMode, setMobileMode] = useState(window.innerWidth <= 600)
const storedUserDetails = JSON.parse(Cookies.get('userDetails'));
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
         
        
        />
      ) : (
        <LeftSideBar icon={"account"}/>
      )}
       <div className="Middle-Container">
            <div className="MyAccount-Container">
              <p style={{ fontSize: "24px" }}>MyAccount</p>
              <FcBusinessman style={{ width: "50px", height: "50px" }} className="Profile-Icon" />
              <p style={{ fontSize: "15px" }}>Username: {storedUserDetails.username}</p>
              <p style={{ fontSize: "15px", flexWrap: "wrap" }}>Email: {storedUserDetails.emailAddress}</p>
              <p style={{ fontSize: "15px" }}>
                Password: {'*'.repeat(storedUserDetails.password)}
              </p>
            </div>
          </div>
          <div className="Right-Bar">
        <h1 style={{ fontSize: "22px" }}>Chat Section<br /> Coming Soon</h1>
      </div>
     </div>)}


export default MyAccountSection