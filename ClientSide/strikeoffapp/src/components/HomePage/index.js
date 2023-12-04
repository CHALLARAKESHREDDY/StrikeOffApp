import React, { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";
import Axios from "axios";

import LeftSideBar from "../LeftSideBar";
import { Navigate } from "react-router-dom";
import { useNavigate} from "react-router-dom";
import ReactPopup from "../CreatePostSection";
import CardItem from "../CardItem";
import { FcEmptyTrash } from "react-icons/fc";

import { FcBusinessman } from 'react-icons/fc';

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
  const [mobileMode, setMobileMode] = useState(window.innerWidth <= 600);
  const navigate = useNavigate();

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
    navigate("/Chat-Section", { state: { username } });
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

  const handleSearch = (value) => {
    setSearchInput(value);
  };

  const handleFilter = (value) => {
    setFilter(value);
  };



  

  const handleIconClick = useCallback((icon) => {
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


    const emptyViewFunction=()=>{
      if (filteredItems.length===0){
        return(
          <div style={{height:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",textAlign:"center"}}>
           

            <FcEmptyTrash style={{fontSize:"140px"}}/>
<br/>
            <p>noItems-Found</p>
          </div>
        )
      }

      return(
        <>
        {filteredItems.map(item => (
          <CardItem item={item} key={uuidv4()} clickedOnChatIcon={clickedOnChatIcon} /> ))}
        </>
       )
    }

    const CardItemsFunction=()=>{
      
      return(
        <ul className="Cards-Container" id="scrollable-container-content">
          {isLoading ? <div style={{height:"100%",width:"100%",textAlign:"center",display:"flex",justifyContent:"center",alignItems:"center"}}><p >Loading...</p></div> :emptyViewFunction()
           
          }
        </ul>
      )
    }



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

        {CardItemsFunction()}
        
      </div>
    );
  }, [cardsItems, isLoading, filterOptions, searchInput, fetchData, clickedOnChatIcon]) ;

  const MainItem = useCallback(() => {
 
        return cardsFunction();
     
    
  }, [cardsFunction]);

  if (Cookies.get("jwtToken") === undefined) {
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <div className="Home-Container">
      {mobileMode ? (
        <MobileNavbar
          onSearch={handleSearch}
          onFilter={handleFilter}
          page="true"

          fetchData={fetchData}
        
        />
      ) : (
        <LeftSideBar icon={"home"} />
      )}
      {MainItem()}
      <div className="Right-Bar">
        <h1 style={{ fontSize: "22px" }}>Chat Section<br /> Coming Soon</h1>
      </div>
    </div>
  );
}

export default HomePage;


