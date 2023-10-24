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
import NavigateWrapper from '../NavigatorComponent';
import './index.css'

class HomePage extends Component{

    constructor(){
        super()
        this.state={cardsItems:[],isLoading:true}
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
     
    render(){
      
        const { isLoading ,cardsItems} = this.state;

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
                 
                    <ReactPopup  />
                   </div>
                <div className="Cards-Container" id="scrollable-container-content" >
                     {isLoading?
                     <p>Loading...</p>:cardsItems.map(item=>(<CardItem item={item} key={item.id}/>))
                     }
                      
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