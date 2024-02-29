import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import "react-awesome-button/dist/styles.css";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./Authentication/LoginPage";
import SignupPage from "./Authentication/SignupPage";
import AboutPage from "./Components/AboutPage";
import AdminDashboardPage from "./Components/Admin/AdminDashboardPage";
import AdminRoute from "./Components/Admin/AdminRoute";
import CodeEditor from "./Components/Admin/CodeEditor";
import QuizDashboard from "./Components/Admin/QuizDashboard";
import Mod from "./Components/Admin/modals/Mod";
import TakeQuiz from "./Components/Engine/TakeQuiz";
import HomePage from "./Components/HomePage";
import SupportPage from "./Components/SupportPage";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import UserDashboard from "./Components/User/UserDashboard";

const Lazyy = React.lazy(() => import("./Components/HomePage"));
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <React.Suspense fallback="Loading...">
                <HomePage />
              </React.Suspense>
            }
          />

          <Route path="/code" element={<CodeEditor />} />
          <Route path="/user-board" element={<UserDashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/contact" element={<SupportPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/modal" element={<Mod />} />
          <Route path="/takeQuiz" element={<TakeQuiz />} />
          <Route path="/admin" element={<AdminRoute />}>
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="quiz" element={<QuizDashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
