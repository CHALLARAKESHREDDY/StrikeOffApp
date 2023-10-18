
import { useNavigate } from 'react-router-dom'
import './index.css'
 

function LoginPage(){


    const history=useNavigate()



    const changeRouteToSignupPage=()=>{
        history('/signup')
    }

    return(
        <div className="Loginpage-Container">
            <form className="Login-Form" >
                <h1>Welcome Back!</h1>
                <input type="text" placeholder='Email Adsress'/>
                <br />
                <input type="password" placeholder='Password' />
                <br/>
                <button type="button" >Login</button>
                <p>Don’t have an account? <span className="Signup-Text" onClick={changeRouteToSignupPage}>Sign Up</span></p>
            </form>
        </div>
    )
}

export default LoginPage