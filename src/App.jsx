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
import UserRoute from "./Components/User/UserRoute";
import AllUsers from "./Components/Admin/Users/AllUsers";
import UserInfoPage from "./Components/Admin/Users/UserInfoPage";
import UserQuiz from "./Components/Admin/Users/UserQuiz";
import QuizCompletionPage from "./Components/Engine/QuizCompletionPage";
import ManageAccount from "./Components/User/ManageAccount";

const Lazyy = React.lazy(() => import("./Components/HomePage"));
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      ddwdabcd
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

          <Route path="/user" element={<UserRoute />}>
            <Route path="userDashboard" element={<UserDashboard />} />
            <Route path="takeQuiz" element={<TakeQuiz />} />
            <Route path="quizCompletion" element={<QuizCompletionPage />} />
            <Route path="manageAccount" element={<ManageAccount />} />
          </Route>
          <Route path="/admin" element={<AdminRoute />}>
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="quiz" element={<QuizDashboard />} />
            <Route path="allusers" element={<AllUsers />} />
            <Route path="userInfo" element={<UserInfoPage />} />
            <Route path="userquiz" element={<UserQuiz />} />
          </Route>dwdwwd
          <Route path="/login" element={<LoginPage />} />
          dwdwdwdwwdwdw
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/contact" element={<SupportPage />} />
          dedewdwdwwdwdwd
          <Route path="/about" element={<AboutPage />} />
          swdwdwd
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
