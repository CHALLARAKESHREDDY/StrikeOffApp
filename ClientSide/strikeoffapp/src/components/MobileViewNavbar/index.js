// MobileNavbar.js
import React, { useState } from "react";
import { BiSolidMessageDots } from 'react-icons/bi';
import ReactPopup from "../CreatePostSection";
import { HiOutlineLogout } from "react-icons/hi";
import NavigateWrapper from '../NavigatorComponent';
import { MdAccountBox } from 'react-icons/md';
import { AiTwotoneHome } from 'react-icons/ai';
import { AiOutlineMenu,} from 'react-icons/ai';
import './index.css'; // Create a corresponding CSS file for styling

const MobileNavbar = ({ onSearch, onFilter,changeIcon,fetchData,navigateToLoginPage}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filterOptions, setFilter] = useState("");
  const [searchInput, setSearchInput] = useState("");

  
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
        <div className="Input-Filter-Mobilemode">
        <input
            type="text"
            id="Input-Mobilemode"
            onChange={(event) => onSearch(event.target.value)}
            placeholder="Search for Coupons"
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
          </div></div>
      <div className="MenuIcon" onClick={toggleMenu}>
        <AiOutlineMenu />
      </div>
      {menuOpen && (
        <div className="MobileMenu">
          <div className="MenuItem" onClick={()=>changeIcon("home")}>
          <AiTwotoneHome  />
            Home
          </div>
          <ReactPopup updateCardsItems={fetchData} />
          <div className="MenuItem" onClick={()=>changeIcon("message")}>
            <BiSolidMessageDots/>
            MyChat
          </div>
          <div className="MenuItem" onClick={()=>changeIcon("account")}>
            <MdAccountBox />
            MyAccount
          </div>
         
          <NavigateWrapper>
            {(navigate) => (
               <div className="MenuItem" onClick={() => navigateToLoginPage(navigate)}>
              <HiOutlineLogout   /> Logout</div>
            )}
          </NavigateWrapper>
          
         
        </div>
      )}
    </div>
  );
};

export default MobileNavbar;
