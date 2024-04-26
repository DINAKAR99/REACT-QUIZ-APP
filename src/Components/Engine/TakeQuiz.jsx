import React, { useEffect, useState } from "react";
import CustomNavbar from "../CustomNavbar";
import Quiz from "./Quiz";
import { useLocation } from "react-router-dom";
import { DocumentFullScreen } from "@chiragrupani/fullscreen-react";

const TakeQuiz = () => {
  document.title = "Quiz Page";
  const location = useLocation();

  const categoryName = location.state ? location.state.categoryName : "";
  let [isFullScreen, setFullScreen] = useState(false);

  useEffect(() => {
    setFullScreen(true);
  });
  return (
    <DocumentFullScreen
      isFullScreen={isFullScreen}
      onChange={(isFull) => {
        setFullScreen(isFull);
      }}
    >
      <Quiz categoryName={categoryName} />
    </DocumentFullScreen>
  );
};

export default TakeQuiz;
