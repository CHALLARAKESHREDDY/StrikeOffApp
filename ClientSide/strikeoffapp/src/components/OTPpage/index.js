import Axios from 'axios'
import {useState} from 'react'


function OTPAuthentication(){
    const [otp, setOtp] = useState('')
const submitOTP=async()=>{
   const response=await Axios.post('http://localhost:3007/verify-otp',{otp: otp})
   console.log(response.data)
}

    return(
        <div>
            <input type="number" onChange={(event)=>setOtp(event.target.value)}/>
            <button type="button" onClick={submitOTP}>Submit</button>
        </div>
    )
}

export default OTPAuthentication