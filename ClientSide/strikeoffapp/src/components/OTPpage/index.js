import Axios from 'axios'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom'

function OTPAuthentication(){
    const [otp, setOtp] = useState('')
    const [errorMsg,setErrorMsg]=useState("")

    let navigate = useNavigate()
const submitOTP=async()=>{
    try{
   const response=await Axios.post('http://localhost:3007/verify-otp',{otp: otp})
   console.log(response)
   if (response.data==="User registered successfully!"){
            navigate('/login')
            setErrorMsg("")
   }else{
      setErrorMsg(response.data)
   }}catch(e){
    setErrorMsg(e.message)
   }
}

    return(
        <div>
            <input type="number" onChange={(event)=>setOtp(event.target.value)}/>
            <button type="button" onClick={submitOTP}>Submit</button>
            {errorMsg===""?null:<p>{errorMsg}</p>}
        </div>
    )
}

export default OTPAuthentication