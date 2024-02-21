import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./Authentication/LoginPage";
import SignupPage from "./Authentication/SignupPage";
import HomePage from "./Components/HomePage";
import UserDashboardPage from "./Components/UserDashboardPage";
import SupportPage from "./Components/SupportPage";
import AboutPage from "./Components/AboutPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/contact" element={<SupportPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/user-dashboard" element={<UserDashboardPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
