import React from "react";
import GaugeComponent from "react-gauge-component";
import useWindowSize from "react-use/lib/useWindowSize";
import star from "../pictures/star.gif";
import { Rating, Typography } from "@mui/material";

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
      className="border rounded-3  border-2 border-black  "
      style={{ Height: "400px" }}
    >
      {/* <Confetti width={width} height={height} numberOfPieces={300} /> */}
      <div className="text-center ">
        <Rating
          name="read-only"
          value={convertFractionToScaleOf5(marks, question_count)}
          readOnly
        />
        <h1>QUIZ COMPLETED </h1>
        <h2>YOUR SCORE</h2>
        <h3>
          {marks}/{question_count}
        </h3>

        <div className="d-flex  justify-content-center  ">
          <GaugeComponent
            arc={{
              subArcs: [
                {
                  limit: 20,
                  color: "#EA4228",
                  showTick: true,
                },
                {
                  limit: 40,
                  color: "#F58B19",
                  showTick: true,
                },
                {
                  limit: 60,
                  color: "#F5CD19",
                  showTick: true,
                },
                {
                  limit: 100,
                  color: "#5BE12C",
                  showTick: true,
                },
              ],
            }}
            value={(marks / question_count) * 100}
          />
        </div>
      </div>
    </div>
  );
};

export default QuizCompletionPage;
