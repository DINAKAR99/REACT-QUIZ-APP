import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import "react-awesome-button/dist/styles.css";
import { Toaster } from "react-hot-toast";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import LoginPage from "./Authentication/LoginPage";
import SignupPage from "./Authentication/SignupPage";
import AboutPage from "./Components/AboutPage";
import AdminDashboardPage from "./Components/Admin/AdminDashboardPage";
import AdminRoute from "./Components/Admin/AdminRoute";
import QuizDashboard from "./Components/Admin/QuizDashboard";
import UnlockQuiz from "./Components/Admin/UnlockQuiz";
import AllUsers from "./Components/Admin/Users/AllUsers";
import ManageAccount from "./Components/Admin/Users/ManageAccount";
import UserInfoPage from "./Components/Admin/Users/UserInfoPage";
import UserQuiz from "./Components/Admin/Users/UserQuiz";
import TakeQuiz from "./Components/Engine/TakeQuiz";
import HomePage from "./Components/HomePage";
import SupportPage from "./Components/SupportPage";
import UserDashboard from "./Components/User/UserDashboard";
import UserRoute from "./Components/User/UserRoute";
import Evaluation from "./Components/Admin/Evaluation";
import Revoke from "./Components/Admin/Revoke";

const Lazyy = React.lazy(() => import("./Components/HomePage"));
function App() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 100);
  }, []);

  return (
    <div>
      {loading ? (
        <div className="App bg-black  ">
          <SyncLoader loading={loading} size={10} color="#38d3b4" />
        </div>
      ) : (
        <>
          <Toaster />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/user" element={<UserRoute />}>
                <Route path="userDashboard" element={<UserDashboard />} />
                <Route path="takeQuiz" element={<TakeQuiz />} />
                <Route path="manageAccount" element={<ManageAccount />} />
              </Route>
              <Route path="/admin" element={<AdminRoute />}>
                <Route path="dashboard" element={<AdminDashboardPage />} />
                <Route path="quiz" element={<QuizDashboard />} />
                <Route path="allusers" element={<AllUsers />} />
                <Route path="evaluate" element={<Evaluation />} />
                <Route path="unlockquiz" element={<UnlockQuiz />} />
                <Route path="userInfo" element={<UserInfoPage />} />
                <Route path="userquiz" element={<UserQuiz />} />
                <Route path="revoke" element={<Revoke />} />
              </Route>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/contact" element={<SupportPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </BrowserRouter>
        </>
      )}
    </div>
  );
}

export default App;
