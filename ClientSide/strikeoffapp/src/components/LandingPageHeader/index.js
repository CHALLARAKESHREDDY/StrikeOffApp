
import { useState } from 'react';
import {Link} from 'react-router-dom'


import './index.css'

const Header = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);



  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flex align-center">
    <p><span>Strike</span>Out</p>
    
    <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
      
        <Link to="/" ><a style={{alignSelf:"center"}}>Home</a></Link>
        <Link to="/landingAbout"><a style={{alignSelf:"center"}}>About</a></Link>

       
                <Link to="/login"><a style={{cursor:"pointer"}}>Login</a></Link>
                <Link to="/signup"><a  style={{cursor:"pointer"}} >Signup</a></Link>
        
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
