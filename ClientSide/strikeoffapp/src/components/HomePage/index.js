import React, { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";
import Axios from "axios";
import { Navigate } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi";
import { FaBriefcase } from 'react-icons/fa';
import { BiSolidMessageDots } from 'react-icons/bi';
import { MdAccountBox } from 'react-icons/md';
import { AiTwotoneHome } from 'react-icons/ai';
import ReactPopup from "../CreatePostSection";
import CardItem from "../CardItem";
import { FcBusinessman } from 'react-icons/fc';
import NavigateWrapper from '../NavigatorComponent';
import MobileNavbar from "../MobileViewNavbar";
import './index.css';

const ICON_NAMES = {
  HOME: "home",
  BRIEFCASE: "briefcase",
  ACCOUNT: "account",
  MESSAGE: "message",
};

function HomePage() {
  const [cardsItems, setCardsItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIcon, setSelectedIcon] = useState(ICON_NAMES.HOME);
  const [usernameChat, setUsernameChat] = useState("");
  const [filterOptions, setFilter] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [mobileMode,setMobileMode]=useState(window.innerWidth <= 600);


  useEffect(() => {
    fetchData();
    const handleResize = () => {
      setMobileMode(window.innerWidth <= 600);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const clickedOnChatIcon = (username) => {
    handleIconClick("message");
    setUsernameChat(username);
};

const handleSearch = (value) => {
  // Implement search functionality
  setSearchInput(value)
  console.log(value)
  console.log('Search clicked');
};

const handleFilter = (value) => {
  // Implement filter functionality
  setFilter(value)
};

const handleCreatePost = () => {
  // Implement create post functionality
  console.log('Create Post clicked');
};

const changeIcon = (icon) => {
  handleIconClick(icon);
};
 
  const fetchData = useCallback(async () => {
    try {
      const jwtTokenClient = Cookies.get("jwtToken");
      const response = await Axios.get('https://strikeout-serverside.onrender.com/cards', {
        headers: {
          Authorization: `Bearer ${jwtTokenClient}`,
        },
      });
      setCardsItems(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  }, []);

  const navigateToLoginPage = useCallback((navigate) => {
    Cookies.remove("jwtToken");
    Cookies.remove("userDetails");
    navigate('/login');
  }, []);

  const handleIconClick = useCallback((icon) => {
    console.log("clickedin")
    setSelectedIcon(icon);
  }, []);

  const cardsFunction = useCallback(() => {
    const filteredItems = cardsItems.filter((item) => {
      const productNameLower = item.productName.toLowerCase();
      return (
        productNameLower.includes(searchInput.toLowerCase()) &&
        (filterOptions === "" || item.category === filterOptions)
      );
    });

    return (
      <div className="Cards-Main-Container">
        <div className="Search-Container">
          <input
            type="text"
            id="Input-Home"
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Search for Coupons"
            style={{ height: "40px" }}
          />

          <div className="category-filter">
            <select
              
              name="filterOptions"
              value={filterOptions}
              onChange={(event) => setFilter(event.target.value)}
            >
              <option value="Clothing">Clothing</option>
              <option value="Beauty">Beauty</option>
              <option value="Footwear">Footwear</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Health">Health</option>
              <option value="Financial">Financial</option>
            </select>
          </div>

          <ReactPopup updateCardsItems={fetchData} />
        </div>
        <ul className="Cards-Container" id="scrollable-container-content">
          {isLoading ? <p>Loading...</p> : filteredItems.map(item => (
            <CardItem item={item} key={uuidv4()} clickedOnChatIcon={clickedOnChatIcon} />
          ))}
        </ul>
      </div>
    );
  }, [cardsItems, isLoading, filterOptions, searchInput]);

  const MainItem = useCallback(() => {
    const storedUserDetails = JSON.parse(Cookies.get('userDetails'));
 

    switch (selectedIcon) {
      case ICON_NAMES.HOME:
        return cardsFunction();
      case ICON_NAMES.BRIEFCASE:
        return <div className="Middle-Container"><h1 style={{ color: "#ffffff" }}>Coming Soon</h1></div>;
      case ICON_NAMES.MESSAGE:
        return (
          <div className="Middle-Container">
            {usernameChat ? (
              <p style={{ color: "#ffffff" }}>
                We know you want to chat with {usernameChat},Please wait, the Chat section is on the way.
              </p>
            ) : (
              <p style={{ color: "#ffffff", fontSize: "20px" }}>Chat Section is Coming Soon</p>
            )}
          </div>
        );
      case ICON_NAMES.ACCOUNT:
        return (
          <div className="Middle-Container">
            <div className="MyAccount-Container">
              <p style={{ fontSize: "24px" }}>MyAccount</p>
              <FcBusinessman style={{ width: "50px", height: "50px" }} className="Profile-Icon" />
              <p style={{ fontSize: "15px" }}>Username: {storedUserDetails.username}</p>
              <p style={{ fontSize: "15px",flexWrap:"wrap"}}>Email: {storedUserDetails.emailAddress}</p>
              <p style={{ fontSize: "15px"}}>
                Password: {'*'.repeat(storedUserDetails.password)}
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  }, [selectedIcon, cardsFunction, usernameChat]);

  if (Cookies.get("jwtToken") === undefined) {
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <div className="Home-Container">
      {mobileMode?
      <div>
      <MobileNavbar onSearch={handleSearch} onFilter={handleFilter} onCreatePost={handleCreatePost} changeIcon={changeIcon} fetchData={fetchData}/>
    </div>:
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
      </div>}
      {MainItem()}
      <div className="Right-Bar">
        <h1 style={{fontSize:"22px"}}>Chat Section<br /> Coming Soon</h1>
      </div>
    </div>
  );
}

export default HomePage;

