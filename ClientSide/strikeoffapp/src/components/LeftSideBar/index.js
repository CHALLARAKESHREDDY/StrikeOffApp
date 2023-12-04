import { useState,useCallback} from 'react'
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi";
import { FaBriefcase } from 'react-icons/fa';
import { BiSolidMessageDots } from 'react-icons/bi';
import { MdAccountBox } from 'react-icons/md';
import { AiTwotoneHome } from 'react-icons/ai';
import NavigateWrapper from '../NavigatorComponent';
import './index.css'


const ICON_NAMES = {
    HOME: "home",
    BRIEFCASE: "briefcase",
    ACCOUNT: "account",
    MESSAGE: "message",
  };
  

function LeftSideBar({icon}){
console.log(icon)
    const [selectedIcon, setSelectedIcon] = useState(icon);
    const history = useNavigate();

    
  const handleIconClick = useCallback((icon) => {
   
    if (icon==="home"){
       history("/home")
    }
    else if (icon==="account"){
        history("/account")
    }

    else if(icon==="message"){
      history("/mychat")
    }
  }, []);

  const navigateToLoginPage = useCallback((navigate) => {
    Cookies.remove("jwtToken");
    Cookies.remove("userDetails");
    history('/login');
  }, []);


    return(
        <div id="Side-Bar">
        <div><h1 className="Strikeout-Logo-Home">STRIKEOUT</h1></div>
        <div id="Logos-Container">
          <div
            className={`react-Icons ${selectedIcon === ICON_NAMES.HOME ? "selected" : ""}`}
            onClick={() => handleIconClick(ICON_NAMES.HOME)}
          >
            <AiTwotoneHome />
          </div>
          <div
            className={`react-Icons ${selectedIcon === ICON_NAMES.BRIEFCASE ? "selected" : ""}`}
            onClick={() => handleIconClick(ICON_NAMES.BRIEFCASE)}
          >
            <FaBriefcase />
          </div>
          <div
            className={`react-Icons ${selectedIcon === ICON_NAMES.ACCOUNT ? "selected" : ""}`}
            onClick={() => handleIconClick(ICON_NAMES.ACCOUNT)}
          >
            <MdAccountBox />
          </div>
          <div
            className={`react-Icons ${selectedIcon === ICON_NAMES.MESSAGE ? "selected" : ""}`}
            onClick={() => handleIconClick(ICON_NAMES.MESSAGE)}
          >
            <BiSolidMessageDots />
          </div>
        </div>
        <div className="Logout-Container">
          <NavigateWrapper>
            {(navigate) => (
              <HiOutlineLogout className="Logout-Logo" onClick={() => navigateToLoginPage(navigate)} />
            )}
          </NavigateWrapper>
          <p className="Logout-Text">Logout</p>
        </div>
      </div>
    )
}

export default LeftSideBar