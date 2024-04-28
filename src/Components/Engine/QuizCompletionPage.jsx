import React from "react";
import idea from "../pictures/idea.png";
const QuizCompletionPage = ({ marks, question_count }) => {
  const calcPercentage = () => {
    const percentage = (marks / question_count) * 100;
    return percentage.toFixed(2);
  };
  return (
    <div
      className="border  border-2 border-start-0 border-top-0   border-black    d-flex  justify-content-center align-items-center vh-100 bg-danger-subtle       "
      style={{ minHeight: "400px" }}
    >
      {/* <Confetti width={width} height={height} numberOfPieces={300} /> */}
      <div className="text-center bg-danger-subtle rounded d-flex   rounded-4 p-5    ">
        <div className="part1 drop-from-top  ">
          {" "}
          <h1 style={{ fontSize: 50 }}>Thank you for Taking the quiz!</h1>
          <br />
          <h2>You've completed the questions. </h2>
          <br />
          <h2>Keep exploring and learning with us! 🌟 </h2>
          <div className="d-flex justify-content-center gap-3  ">
            <button
              className="btn  mt-4  "
              style={{ backgroundColor: "#a774648e" }}
              onClick={(e) => (window.location.href = "/")}
            >
              Home <i class="fa fa-home"></i>
            </button>
            <button
              className="btn  mt-4 bg-
               "
              style={{ backgroundColor: "#F7F7F9" }}
              onClick={(e) => (window.location.href = "/user/userDashboard")}
            >
              Back <i class="fa fa-arrow-left"></i>
            </button>
          </div>
        </div>
        <div className="part2 drop-from-right ">
          {" "}
          <img
            src={idea}
            alt=""
            style={{
              width: "430px",

              opacity: "0.6",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default QuizCompletionPage;
