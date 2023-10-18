
import { useNavigate } from 'react-router-dom'
import './index.css'

function LandingPage(){

    const history=useNavigate()

    const changeRouteToLogin=()=>{
        
        history('/login')
    }

    const changeRouteToSignup=()=>{
        history('./signup')
    }

    return(
        <div className="Landingpage-Container">
            <div className="Landingpage-Sub-Container">
                <div><h1 className="Strikeout-Logo">STRIKEOUT</h1></div>
                <div className="Home-About-Container">
                    <p className="Home-Heading">Home</p>
                    <p  className="App-Heading">About</p>
                </div>
                <div className="Login-Singup-Buttons">
                    <button className="Login-Button" onClick={changeRouteToLogin}>Login</button>
                    <button className="Singup-Button" onClick={changeRouteToSignup}>Signup</button>
                </div>
            </div>
            <div className="Quote-Image-Container">
                <div>
                    <h1 className="Quote">OPENING VERY <br/> SOON</h1>
                </div>
                <img  className="Landing-Image" src="https://img.freepik.com/free-photo/view-3d-woman-using-laptop_23-2150710060.jpg?t=st=1697581551~exp=1697585151~hmac=3dd046fc330b6290e80624729c72fcc1e725e332c18f67a3ed0e4f7dd15fab6a&w=740" alt="Landing-image" />
            </div>

        </div>
    )
}


export default LandingPage