import { Component } from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import { HiOutlineLogout} from "react-icons/hi";
import {FaBriefcase} from 'react-icons/fa'
import {BiSolidMessageDots} from 'react-icons/bi'
import {MdAccountBox} from 'react-icons/md'
import {AiTwotoneHome} from 'react-icons/ai'
import ReactPopup from "../CreatePostSection";
import NavigateWrapper from '../NavigatorComponent';
import './index.css'

class HomePage extends Component{

    navigateToSomePage = (navigate) => {
        Cookies.remove("jwtToken")
        navigate('/login');
      }
     
    render(){

        if (Cookies.get("jwtToken") === undefined) {
            return (
                <Navigate to="/login" replace={true} />
              )
          }

        return(
            <div className="Home-Container">
                <div className="Side-Bar">
                <div><h1 className="Strikeout-Logo-Home">STRIKEOUT</h1></div>
                    <div className="Logos-Container">
                        <div className="react-Icons"><AiTwotoneHome /></div>
                        <div  className="react-Icons"><FaBriefcase /></div>
                      
                        <div  className="react-Icons"><BiSolidMessageDots /></div>
                        <div  className="react-Icons"><MdAccountBox /></div>
             
                    </div>
                    <div className="Logout-Container">
                    
                     <NavigateWrapper>
          {(navigate) => (
        
              <HiOutlineLogout className="Logout-Logo" onClick={() => this.navigateToSomePage(navigate)}/>
           
          )}
        </NavigateWrapper>
                     <p className="Logout-Text">Logout</p>
                    </div>
                   
                </div>
                <div className="Cards-Main-Container">
                   <div className="Search-Container">
                    <input type="text" className="Input-Home" placeholder="Search for Items"/>
                 
                    <ReactPopup />
                   </div>
                <div className="Cards-Container">
                    <div className="Cards">
                        <div><img className="Card-Image" src="https://img.freepik.com/free-photo/pretty-young-stylish-sexy-woman-pink-luxury-dress-summer-fashion-trend-chic-style-sunglasses-blue-studio-background-shopping-holding-paper-bags-talking-mobile-phone-shopaholic_285396-2957.jpg?w=1060&t=st=1697736877~exp=1697737477~hmac=7fbd6925b921bb9e05ebac81e9b9795ddea0b1c1bffddeaa3378c1d62710231b" alt="shopping-img"/></div>
                        <div className="Description-Container">
                            <p>Heading</p>
                            <p>Description</p>
                        </div>
                    </div>
                </div>
               
                </div>
               <div className="Right-Bar">
                    <h1>Chat Section<br/> Comming Soon</h1>
               </div>
            </div>
        )
    }
}


export default HomePage;