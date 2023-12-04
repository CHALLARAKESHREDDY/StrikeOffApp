import {BrowserRouter,Route,Routes} from "react-router-dom"
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import SignupPage from "./components/SignupPage";
import DataContext from "./Context";
import './App.css';
import OTPAuthentication from "./components/OTPpage";
import About from "./components/LandingPageAbout";
import { useState } from "react";
import ForgotPassword from "./components/ForgotPassword";
import OTPAuthenticationForgotPassword from "./components/ForgotPasswordOTP";
import NewPasswordSetup from "./components/NewPasswordSetup";
import NotFound from "./components/NotFound";
import MyAccountSection from "./components/MyAccountPage";
import MyChatSection from "./components/MyChatPage";
import ChatOneSection from "./components/OneChatPage";


function App() {
  const [details,setDetails]=useState("")
  const setUserDetails=(data)=>{
    setDetails(data)
    
  }
  console.log(details)
  return (
    <DataContext.Provider value={{details, setUserDetails:setUserDetails}}>
   <BrowserRouter>
   <Routes>
    <Route exact path="/" element={<LandingPage />} />
    <Route exact path="/login" element={<LoginPage />} />
    <Route exact path="/signup" element={<SignupPage />} />
    <Route exact path="/home" element={<HomePage />} />
    <Route exact path="/landingAbout" element={<About />} />
   <Route exact path="/account" element={<MyAccountSection/>} />
   <Route exact path="/mychat" element={<MyChatSection/>} />
    <Route exact path="/OTPPage" element={<OTPAuthentication />} />
    <Route exact path="/Chat-Section" element={<ChatOneSection/>} />
    <Route exact path="/forgotPassword" element={<ForgotPassword />} />
    <Route exact path="/forgot-OTP" element={<OTPAuthenticationForgotPassword />} />
    <Route path="/New-Password-Setup" element={<NewPasswordSetup />} />
    <Route path="*" element={<NotFound />} />
   </Routes>
   </BrowserRouter>
   </DataContext.Provider>
  );
}

export default App;