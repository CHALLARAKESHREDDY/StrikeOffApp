/*import { Link } from 'react-router-dom';
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


*/

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {Link} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {HiMenu} from 'react-icons/hi'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const history = useNavigate();
   

    const changeRouteToLogin = () => {
        history('/login');
    };

    const changeRouteToSignup = () => {
        history('/signup');
    };


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <nav className="flex align-center">
    <p><span>Strike</span>Out</p>
    <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
    
        <Link to="/" ><a style={{alignSelf:"center"}}>Home</a></Link>
        <Link to="/landingAbout"><a style={{alignSelf:"center"}}>About</a></Link>

       
                <a onClick={changeRouteToLogin}>Login</a>
                <a onClick={changeRouteToSignup} >Signup</a>
        
      </div>
      <div className="menu-icon" onClick={toggleMenu}>
        <div className={`bar ${isMenuOpen ? 'change' : ''}`}></div>
        <div className={`bar ${isMenuOpen ? 'change' : ''}`}></div>
        <div className={`bar ${isMenuOpen ? 'change' : ''}`}></div>
      </div>
  </nav>
  )
}

export default Header
