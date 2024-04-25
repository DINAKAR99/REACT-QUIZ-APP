import React from "react";

const QuizCompletionPage = ({ marks, question_count }) => {
  const calcPercentage = () => {
    const percentage = (marks / question_count) * 100;
    return percentage.toFixed(2);
  };
  return (
    <div
      className="border  border-2 border-start-0 border-top-0   border-black    d-flex  justify-content-center    "
      style={{ minHeight: "400px" }}
    >
      {/* <Confetti width={width} height={height} numberOfPieces={300} /> */}
      <div className="text-center ">
        {/* <Rating
          name="read-only"
          value={convertFractionToScaleOf5(marks, question_count)}
          readOnly
        /> */}
        <h3>THANK YOU FOR TAKING THE QUIZ </h3>
        <h2>QUIZ SUBMITTED SUCCESFULLY </h2>
        <h3>you got correct :</h3>
        <h3>
          {marks}/{question_count}
          <br />
          {calcPercentage()}%
        </h3>
      </div>
    </div>
  );
};

export default QuizCompletionPage;
