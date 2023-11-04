import React, { useContext, useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import Axios from "axios";
import { Navigate } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi";
import DataContext from "../../Context";
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

    const navigateToSomePage = useCallback((navigate) => {
        Cookies.remove("jwtToken");
        Cookies.remove("userDetails")
        navigate('/login');
    }, []);

    const handleIconClick = useCallback((icon) => {
        setSelectedIcon(icon);
    }, []);

    const cardsFunction = useCallback(() => {
        
        return (
            <div className="Cards-Main-Container">
                <div className="Search-Container">
                    <input type="text" id="Input-Home" placeholder="Search for Coupons" style={{ height: "40px" }} />
                    <ReactPopup />
                </div>
                <div className="Cards-Container" id="scrollable-container-content">
                    {isLoading ?
                        <p>Loading...</p> : cardsItems.map(item => <CardItem item={item} key={item.id} />)
                    }
                </div>
            </div>
        );
    }, [cardsItems, isLoading]);

    const MainItem = useCallback(() => {
        const storedUserDetails = JSON.parse(Cookies.get('userDetails'));
        
       switch (selectedIcon) {
            case "home":
                return cardsFunction();
            case "briefcase":
                return <div className="Middle-Container"><h1 style={{ color: "#ffffff" }}>Coming Soon</h1></div>;
            case "message":
                return <div className="Middle-Container"><h1 style={{ color: "#ffffff" }}>Coming Soon</h1></div>;
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
                return null; // Return null for unknown icons or handle as needed
        }
    }, [selectedIcon, cardsFunction]);

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
                        className={`react-Icons ${selectedIcon === "message" ? "selected" : ""}`}
                        onClick={() => handleIconClick("message")}
                    >
                        <BiSolidMessageDots />
                    </div>
                    <div
                        className={`react-Icons ${selectedIcon === "account" ? "selected" : ""}`}
                        onClick={() => handleIconClick("account")}
                    >
                        <MdAccountBox />
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

export default HomePage;
