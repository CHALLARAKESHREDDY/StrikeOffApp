import './index.css'

function WhoAreYou(){

    const loginContainer=()=>{
        
return (<div className="Login-Container"><p>Login</p></div>)
    }

    const signupContainer=()=>{
        return ( <div className="Login-Container"><p>SingUp</p></div>)
    }

    return(
        <div className="Who-are-you-Container">
            {loginContainer()}
            {signupContainer()}
        </div>
    )
}


export default WhoAreYou