import React from "react";

const QuizCompletionPage = ({ marks, question_count }) => {
  function convertFractionToScaleOf5(marks, questionCount) {
    // Ensure marks and questionCount are numbers
    marks = parseFloat(marks);
    questionCount = parseFloat(questionCount);

    // Calculate the ratio of marks to questionCount
    const ratio = marks / questionCount;

    // Map the ratio to the scale of 5
    const scaleValue = Math.ceil(ratio * 5);

    // Ensure scaleValue is within the range of 1 to 5
    return Math.min(Math.max(scaleValue, 1), 5);
  }
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
        <h2>QUIZ SUBMITTED SUCCESFULLY </h2>
        <h3>you have attempted :</h3>
        <h3>
          {marks}/{question_count}
        </h3>
      </div>
    </div>
  );
};

export default QuizCompletionPage;
