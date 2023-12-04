// MobileNavbar.js
import React, { useState } from "react";
import { BiSolidMessageDots } from 'react-icons/bi';
import ReactPopup from "../CreatePostSection";
import { HiOutlineLogout } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import NavigateWrapper from '../NavigatorComponent';
import { MdAccountBox } from 'react-icons/md';
import { AiTwotoneHome } from 'react-icons/ai';
import { AiOutlineMenu,} from 'react-icons/ai';
import './index.css'; // Create a corresponding CSS file for styling

const MobileNavbar = ({ onSearch, onFilter,fetchData,page,chatsPage}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filterOptions, setFilter] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const history = useNavigate();


  const handleIconClick=(icon)=>{
    if (icon==="home"){
      history("/home")
    }
    else if(icon==="account"){
      history("/account")
    }
    else if(icon==="mychat"){
      history("/mychat")
    }

  }

  const logout=()=>{
    history("/login")
    Cookies.remove("jwtToken")
  }

  
const changeFilter=(value)=>{
    setFilter(value)
    onFilter(value)
    
}

  const toggleMenu = () => {
   
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="MobileNavbar">
        <p style={{fontWeight:"500"}} className="StrikeOut-Loggo">StrikeOut</p>
        
          {page?<> <div className="Input-Filter-Mobilemode">
        <input
            type="text"
            id="Input-Mobilemode"
            onChange={(event) => onSearch(event.target.value)}
            placeholder="  Search for Coupons"
            style={{ height: "25px" }}
          />

          <div className="category-filter-Mobilemode">
            <select
            className="category-Select"
              id="categorySelect-Mobilemode"
              name="filterOptions"
              value={filterOptions}
              onChange={(event) => changeFilter(event.target.value)}  style={{ height: "25px",alignSelf:"flex-start"}}
            >
              <option value="Clothing">Clothing</option>
              <option value="Beauty">Beauty</option>
              <option value="Footwear">Footwear</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Health">Health</option>
              <option value="Financial">Financial</option>
            </select>
          </div></div></>:null}
          {chatsPage?<div className="Input-Filter-Mobilemode" style={{width:"100%"}}>
        <input
            type="text"
            id="Input-Mobilemode"
        
            placeholder="  Search for Chats"
            style={{ height: "25px",width:"80%"}}
          /></div>:null}
         
      <div className="MenuIcon" onClick={toggleMenu}>
        <AiOutlineMenu />
      </div>
      {menuOpen && (
        <div className="MobileMenu">
          <div className="MenuItem" onClick={()=>handleIconClick("home")}>
          <AiTwotoneHome  />
            Home
          </div>
          <ReactPopup updateCardsItems={fetchData} />
          <div className="MenuItem" onClick={()=>handleIconClick("mychat")}>
            <BiSolidMessageDots/>
            MyChat
          </div>
          <div className="MenuItem" onClick={()=>handleIconClick("account")}>
            <MdAccountBox />
            MyAccount
          </div>
         
          <NavigateWrapper>
            {(navigate) => (
               <div className="MenuItem" onClick={() => logout(navigate)}>
              <HiOutlineLogout   /> Logout</div>
            )}
          </NavigateWrapper>
          
         
        </div>
      )}
    </div>
  );
};

export default MobileNavbar;
