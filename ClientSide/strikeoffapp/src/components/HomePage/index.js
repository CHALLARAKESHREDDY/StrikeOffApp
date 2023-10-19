import { Component } from "react";

import './index.css'

class HomePage extends Component{
    render(){
        return(
            <div className="Home-Container">
                <div className="Side-Bar">
                <div><h1 className="Strikeout-Logo-Home">STRIKEOUT</h1></div>
                    <div className="Logos-Container">
                        <p>Home</p>
                        <p>POST</p>
                        <p>Instructions</p>
                        <p>Support</p>
                        <p>Account</p>
                    </div>
                    <div>
                     
                     <p>Logout</p>
                    </div>
                   
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
        )
    }
}


export default HomePage