import {BrowserRouter,Route,Routes} from "react-router-dom"
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import WhoAreYou from "./components/WhoAreYouPage"
import './App.css';

function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route exact path="/" element={<LandingPage />} />
    <Route exact path="/login" element={<LoginPage />} />
    <Route exact path="/signup" element={<SignupPage />} />
   </Routes>
   </BrowserRouter>
  );
}

export default App;