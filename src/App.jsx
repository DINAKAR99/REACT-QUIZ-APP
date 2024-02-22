import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./Authentication/LoginPage";
import SignupPage from "./Authentication/SignupPage";
import HomePage from "./Components/HomePage";
import UserDashboardPage from "./Components/UserDashboardPage";
import SupportPage from "./Components/SupportPage";
import AboutPage from "./Components/AboutPage";
import AdminDashboardPage from "./Components/Admin/AdminDashboardPage";
import QuizManager from "./Components/Admin/QuizManager";
import AddQuiz from "./Components/Admin/AddQuiz";
import AdminRoute from "./Components/Admin/AdminRoute";

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
          <Route path="/admin" element={<AdminRoute />}>
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="quiz" element={<QuizManager />} />
          </Route>

          <Route path="/user-dashboard" element={<UserDashboardPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
