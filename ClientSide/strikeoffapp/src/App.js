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
    <Route exact path="/OTPPage" element={<OTPAuthentication />} />
   </Routes>
   </BrowserRouter>
   </DataContext.Provider>
  );
}

export default App;