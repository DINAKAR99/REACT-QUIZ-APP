import "bootstrap/dist/css/bootstrap.min.css";
import "react-awesome-button/dist/styles.css";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./Authentication/LoginPage";
import SignupPage from "./Authentication/SignupPage";
import AboutPage from "./Components/AboutPage";
import AdminDashboardPage from "./Components/Admin/AdminDashboardPage";
import AdminRoute from "./Components/Admin/AdminRoute";
import QuizDashboard from "./Components/Admin/QuizDashboard";
import Mod from "./Components/Admin/modals/Mod";
import HomePage from "./Components/HomePage";
import SupportPage from "./Components/SupportPage";
import UserDashboardPage from "./Components/UserDashboardPage";
import { Toaster } from "react-hot-toast";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/contact" element={<SupportPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/modal" element={<Mod />} />
          <Route path="/admin" element={<AdminRoute />}>
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="quiz" element={<QuizDashboard />} />
          </Route>

          <Route path="/user-dashboard" element={<UserDashboardPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
