import React from "react";
import CustomNavbar from "../CustomNavbar";
import Quiz from "./Quiz";
import { useLocation } from "react-router-dom";

const TakeQuiz = () => {
  const location = useLocation();

  const categoryName = location.state ? location.state.categoryName : "";
  return (
    <>
      <CustomNavbar />
      <Quiz categoryName={categoryName} />
    </>
  );
};

export default TakeQuiz;
