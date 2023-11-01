import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AiOutlineMenu from 'react-icons/ai'
import { useState } from 'react';

import './index.css'

function Header() {
    const history = useNavigate();
    const [activeLink, setActiveLink] = useState("home");

    const changeRouteToLogin = () => {
        history('/login');
    };

    const changeRouteToSignup = () => {
        history('/signup');
    };

    
    let cssStylesTwo={
        textDecoration: "underlined",
        color:' #4F51C0',
    
    }

    let cssStylesOne={
        textDecoration:"none",
        color:"#ffffff",
      
    }


    if (activeLink==="home"){
            
        cssStylesOne={
            textDecoration: "none",
            color:"#ffffff",
          
        }
    
         cssStylesTwo={
            textDecoration:"underlined",
         
            color:' #4F51C0',
           
        }

    }else{
        cssStylesOne={
            textDecoration:"underlined",
         
            color:' #4F51C0',
           
        }
    
         cssStylesTwo={
           
            textDecoration: "none",
            color:"#ffffff",
           
        }}


    const handleLinkClick = (link) => {

        setActiveLink(link)
       
       

        }
       
    
       



    return (
        <div className="Landingpage-Sub-Container">
            <div className="Strikeout-Logo-Container">
                <h1 className="Strikeout-Logo">STRIKEOUT</h1>
            </div>
            <div className="Home-About-Container">
               <div onClick={()=>handleLinkClick("home")}><Link to="/" style={cssStylesTwo}><p className="Home-Text" style={cssStylesTwo} >Home</p></Link></div>
              <div onClick={()=>handleLinkClick("about")}><Link to="/landingAbout" style={cssStylesOne}><p className="About-Text" style={cssStylesOne}   >About</p></Link> </div>
            </div>
            <div id="Login-Singup-Buttons">
                <button className="Login-Button" onClick={changeRouteToLogin}>Login</button>
                <button className="Singup-Button" onClick={changeRouteToSignup}>Signup</button>
            </div>
            <div className="Header-Mobileview">
            <div className="Home-About-Container-MobileView">
               <div onClick={()=>handleLinkClick("home")}><Link to="/" style={cssStylesTwo}><p className="Home-Text" style={cssStylesTwo} >Home</p></Link></div>
              <div onClick={()=>handleLinkClick("about")}><Link to="/landingAbout" style={cssStylesOne}><p style={cssStylesOne}   className='about-Text'>About</p></Link> </div>
            </div>
            <div id="Login-Singup-Buttons-MobileView">
                <button className="Login-Button" onClick={changeRouteToLogin}>Login</button>
                <button className="Singup-Button" onClick={changeRouteToSignup}>Signup</button>
            </div>
                
            </div>
        </div>
    );
}

export default Header;
