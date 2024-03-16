import React from "react";
import CustomNavbar from "../CustomNavbar";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

const QuizCompletionPage = ({ marks, question_count }) => {
  const navi = useNavigate();
  return (
    <div>
      <div
        className="border  border-2 border-start-0 border-top-0 vh-100     border-black    d-flex  justify-content-center       "
        style={{ minHeight: "400px" }}
      >
        <div className="text-center ">
          <h2>QUIZ SUBMITTED SUCCESFULLY </h2>
          <h3>you have attempted :</h3>
          <h3>
            {marks}/{question_count}
          </h3>

          <Button
            onClick={() => {
              navi("/");
            }}
          >
            Home &nbsp;<i class="fa-solid fa-house"></i>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizCompletionPage;
