import { Component } from "react";
import Cookies from "js-cookie";
import  Axios from "axios";
import { Navigate } from "react-router-dom";
import { HiOutlineLogout} from "react-icons/hi";
import {FaBriefcase} from 'react-icons/fa'
import {BiSolidMessageDots} from 'react-icons/bi'
import {MdAccountBox} from 'react-icons/md'
import {AiTwotoneHome} from 'react-icons/ai'
import ReactPopup from "../CreatePostSection";
import CardItem from "../CardItem";
import {FcBusinessman} from 'react-icons/fc'
import NavigateWrapper from '../NavigatorComponent';
import './index.css'

class HomePage extends Component{

   
        state={cardsItems:[],isLoading:true, selectedIcon: "home"}

    

    cardsFunction=()=>
    {
        const { isLoading, cardsItems} = this.state;
        return (
            <>
            <div className="Cards-Main-Container">
                   <div className="Search-Container">
                    <input type="text" id="Input-Home" placeholder="Search for Coupons" style={{height:"40 px"}}/>
                 
                    <ReactPopup  />
                   </div>
                <div className="Cards-Container" id="scrollable-container-content" >
               
                  
                     {isLoading?
                     <p>Loading...</p>:cardsItems.map(item=>(<CardItem item={item} key={item.id}/>))
                     }
                      
                </div>
                </div>
                </>
        )}
    

        MainItem=()=>{
            const { isLoading, cardsItems,cardsFunction} = this.state;
    switch (this.state.selectedIcon) { 
        case "home":
            return this.cardsFunction();
        case "briefcase":
            return <div className="Middle-Container"><h1 style={{color:"#ffffff"}}>Coming Soon</h1></div>;
        case "message" :
            return <div className="Middle-Container"><h1 style={{color:"#ffffff"}}>Coming Soon</h1></div>;
        case "account" :
            return <div className="Middle-Container">
                <div className="MyAccount-Container">
                  
                    <p style={{fontSize:"24px"}}>MyAccount</p>
                    <FcBusinessman style={{width:"50px",height:"50px"}} className="Profile-Icon"/>
                    <p style={{fontSize:"17px"}}>Username : Rakesh</p>
                    <p style={{fontSize:"17px"}}>Email : rakeshchr17@gmail.com</p>
                    <p style={{fontSize:"17px"}}>Password : *********</p>
                    

                    </div></div> 
        default:
            return null; // Return null for unknown icons or handle as needed
    }
}



    componentDidMount=()=>{
        this.getDataFromDb()
    } 

    getDataFromDb=async()=>{
        try{
        const jwtTokenClient=await Cookies.get("jwtToken")
        const response = await Axios.get('http://localhost:3007/cards', {
            headers: {
              Authorization: `Bearer ${jwtTokenClient}`,
            },
          });
        this.setState({cardsItems:response.data,isLoading:false})
             
        }catch (e){
            console.log(e.message)
        }
    }

    navigateToSomePage = (navigate) => {
        Cookies.remove("jwtToken")
        navigate('/login');
      }

      handleIconClick = (icon) => {
        this.setState({ selectedIcon: icon });
    }
     
    render(){
      
        const { isLoading ,cardsItems,selectedIcon} = this.state;

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
    <div
        className={`react-Icons ${this.state.selectedIcon === "home" ? "selected" : ""}`}
        onClick={() => this.handleIconClick("home")}
    >
        <AiTwotoneHome />
    </div>
    <div
        className={`react-Icons ${this.state.selectedIcon === "briefcase" ? "selected" : ""}`}
        onClick={() => this.handleIconClick("briefcase")}
    >
        <FaBriefcase />
    </div>
    <div
        className={`react-Icons ${this.state.selectedIcon === "message" ? "selected" : ""}`}
        onClick={() => this.handleIconClick("message")}
    >
        <BiSolidMessageDots />
    </div>
    <div
        className={`react-Icons ${this.state.selectedIcon === "account" ? "selected" : ""}`}
        onClick={() => this.handleIconClick("account")}
    >
        <MdAccountBox />
    </div>
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
                
               {this.MainItem()}
               
               <div className="Right-Bar">
                    <h1>Chat Section<br/> Comming Soon</h1>
               </div>
            </div>
        )
    }
}


export default HomePage;