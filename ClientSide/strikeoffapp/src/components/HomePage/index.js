import React, { useContext, useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import { v4 } from "uuid";
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
import './index.css';

function HomePage() {
    const [cardsItems, setCardsItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedIcon, setSelectedIcon] = useState("home");
    const [usernameChat, setUsernameChat] = useState("");
    const [filterOptions, setFilter] = useState("");
    const [searchInput, setSearchInput] = useState("");

    const clickedOnChatIcon = (username) => {
        handleIconClick("message");
        setUsernameChat(username);
    }

    useEffect(() => {
        getDataFromDb();
    }, []);

    const getDataFromDb = useCallback(async () => {
        try {
            const jwtTokenClient = Cookies.get("jwtToken");
            const response = await Axios.get('http://localhost:3007/cards', {
                headers: {
                    Authorization: `Bearer ${jwtTokenClient}`,
                },
            });
            setCardsItems(response.data);
            setIsLoading(false);
        } catch (e) {
            console.log(e.message);
        }
    }, []);


    const updateCardsItems = () => {
        // This function will be called to refresh the cardsItems state
        getDataFromDb();
      };
    

    const navigateToSomePage = useCallback((navigate) => {
        Cookies.remove("jwtToken");
        Cookies.remove("userDetails");
        navigate('/login');
    }, []);

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

        return (
            <div className="Cards-Main-Container">
                <div className="Search-Container">
                    <input type="text" id="Input-Home" onChange={(event) => setSearchInput(event.target.value)} placeholder="Search for Coupons" style={{ height: "40px" }} />

                    <div className="category-filter">
                        <select
                            id="categorySelect"
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

                    <ReactPopup updateCardsItems={updateCardsItems} />
                </div>
                <ul className="Cards-Container" id="scrollable-container-content">
                    {isLoading ?
                        <p>Loading...</p> : filteredItems.map(item => (
                            <CardItem item={item} key={item.id} clickedOnChatIcon={clickedOnChatIcon} id={v4()} />
                        ))
                    }
                </ul>
            </div>
        );
    }, [cardsItems, isLoading, filterOptions, searchInput]);

    const MainItem = useCallback(() => {
        const storedUserDetails = JSON.parse(Cookies.get('userDetails'));

        switch (selectedIcon) {
            case "home":
                return cardsFunction();
            case "briefcase":
                return <div className="Middle-Container"><h1 style={{ color: "#ffffff" }}>Coming Soon</h1></div>;
            case "message":
                switch (usernameChat) {
                    case "":
                        return <div className="Middle-Container"><p style={{ color: "#ffffff", fontSize: "20px" }}>Chat Section is Coming Soon</p></div>;
                    default:
                        return <div className="Middle-Container"><p style={{ color: "#ffffff" }}>I know you want to chat with <br />{usernameChat}, We are on the way to make you connect with <br />{usernameChat}. Please wait, the Chat section is on the way.</p></div>;
                }
            case "account":
                return (
                    <div className="Middle-Container">
                        <div className="MyAccount-Container">
                            <p style={{ fontSize: "24px" }}>My Account</p>
                            <FcBusinessman style={{ width: "50px", height: "50px" }} className="Profile-Icon" />
                            <p style={{ fontSize: "17px" }}>Username: {storedUserDetails.username}</p>
                            <p style={{ fontSize: "17px" }}>Email: {storedUserDetails.emailAddress}</p>
                            <p style={{ fontSize: "17px" }}>
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
            <div className="Side-Bar">
                <div><h1 className="Strikeout-Logo-Home">STRIKEOUT</h1></div>
                <div className="Logos-Container">
                <div
  className={`react-Icons ${selectedIcon === "home" ? "selected" : ""}`}
  onClick={() => handleIconClick("home")}
>
  <AiTwotoneHome />
</div>
<div
  className={`react-Icons ${selectedIcon === "briefcase" ? "selected" : ""}`}
  onClick={() => handleIconClick("briefcase")}
>
  <FaBriefcase />
</div>

<div
  className={`react-Icons ${selectedIcon === "account" ? "selected" : ""}`}
  onClick={() => handleIconClick("account")}
>
  <MdAccountBox />
</div>
<div
  className={`react-Icons ${selectedIcon === "message" ? "selected" : ""}`}
  onClick={() => handleIconClick("message")}
>
  <BiSolidMessageDots />
</div>

                </div>
                <div className="Logout-Container">
                    <NavigateWrapper>
                        {(navigate) => (
                            <HiOutlineLogout className="Logout-Logo" onClick={() => navigateToSomePage(navigate)} />
                        )}
                    </NavigateWrapper>
                    <p className="Logout-Text">Logout</p>
                </div>
            </div>
            {MainItem()}
            <div className="Right-Bar">
                <h1>Chat Section<br /> Coming Soon</h1>
            </div>
        </div>
    );
}

function IconContainer({ selectedIcon, onClick, children }) {
    return (
        <div className={`react-Icons ${selectedIcon === children.props.iconName ? "selected" : ""}`} onClick={onClick}>
            {children}
        </div>
    );
}


export default HomePage;
