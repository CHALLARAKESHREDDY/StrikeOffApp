import {BrowserRouter,Route,Routes} from "react-router-dom"
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import SignupPage from "./components/SignupPage";
import './App.css';
import OTPAuthentication from "./components/OTPpage";

function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route exact path="/" element={<LandingPage />} />
    <Route exact path="/login" element={<LoginPage />} />
    <Route exact path="/signup" element={<SignupPage />} />
    <Route exact path="/home" element={<HomePage />} />
    <Route exact path="/OTPPage" element={<OTPAuthentication />} />
   </Routes>
   </BrowserRouter>
  );
}

export default App;