import React, { useCallback, useEffect, useState } from "react";
import { AwesomeButton } from "react-awesome-button";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Button, Col, Container, Input, Row } from "reactstrap";
import { getAllQuestionsPerCategory } from "../Helper/QuizHelper";

const Quiz = () => {
  const quizData = [
    {
      question:
        "  1 . Describe how polymorphism is achieved through method overloading.",
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: "Option A",
    },
    {
      question:
        "  2 .  Describe how sqqsqq is achieved through method overloading.",
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: "Option C",
    },
    // Add more questions here
  ];

  const options = [
    `Describe how polymorphism is achieved thr g and method overloading.`,
    `Describe how poly ethod overl ading.`,
    `Describe how  erriding and method overloa g.`,
    `Describe how polymorphism is achieved through overload `,
  ];
  const [loading, setLoading] = useState(true);
  const [fecthedQuestions, setFetchedQuestions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(() => {
    const storedOptions = localStorage.getItem("selectedOptions");
    return storedOptions ? JSON.parse(storedOptions) : {};
  });

  const [userResponses, setUserResponses] = useState([]);
  const currentQuestion = quizData[currentQuestionIndex];

  useEffect(() => {
    localStorage.setItem("selectedOptions", JSON.stringify(selectedOptions));

    console.log(selectedOptions);
  }, [selectedOptions]);

  useEffect(() => {
    getAllQuestionsPerCategory("java").then((resultSet) => {
      let rawArray = [];
      console.log(resultSet.slice(1, -1));
      rawArray = resultSet.slice(1, -1);
      rawArray = rawArray.map((each) => Object.values(each)[0]);

      setFetchedQuestions(rawArray);

      console.log(rawArray);
      setLoading(false);
    });
  }, []);
  const handleOptionClick = (option) => {
    const questionId = currentQuestionIndex; // Assuming question index serves as question ID

    const existingResponseIndex = userResponses.findIndex(
      (each) => each.questionId == questionId
    );

    if (existingResponseIndex !== -1) {
      const updatedResponses = [...userResponses];

      updatedResponses[existingResponseIndex] = {
        ...updatedResponses[existingResponseIndex],
        selectedOption: option,
      };

      setUserResponses(updatedResponses);
    } else {
      // Create a new user response object
      const newUserResponse = {
        questionId: currentQuestionIndex, // Assuming question index serves as question ID
        category: "YourCategory", // Replace 'YourCategory' with the actual category
        selectedOption: option,
      };
      // Update user responses state by adding the new response
      setUserResponses([...userResponses, newUserResponse]);
    }

    setSelectedOptions({ ...selectedOptions, [currentQuestionIndex]: option });
    setSelectedOption(option);
  };
  // Inside your Quiz <component>       </component>
  const handleComplete = useCallback(() => {
    console.log("Countdown timer completed!");
    // Perform any other actions you want here
    return { shouldRepeat: true, delay: 1 };
  }, []);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < fecthedQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null); // Reset selected option for the next question
    }
  };
  const handleSubmit = () => {
    console.log(userResponses);
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption(null); // Reset selected option for the previous question
    }
  };

  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return (
        <div className="timer" style={{ fontSize: "16px" }}>
          late...
        </div>
      );
    }

    return (
      <div className="timer">
        <div className="text"></div>
        <div style={{ fontSize: "16px" }} className="value">
          {remainingTime}
        </div>
        <div className="text"></div>
      </div>
    );
  };

  return (
    <Container fluid>
      <Row className="d-flex justify-content-center mt-5 ">
        <Col md={6} style={{ minHeight: "600px" }}>
          <div>{loading ? <h1>loading...</h1> : <h1>loaded...</h1>}</div>
          <div className="border rounded p-4 shadow-lg ">
            <header className="d-flex  ">
              <b>
                Question {currentQuestionIndex + 1}/{fecthedQuestions.length}
              </b>

              <h4 className="ms-auto">
                <div className="timer-wrapper   ">
                  <CountdownCircleTimer
                    size={40}
                    isPlaying
                    strokeWidth={4}
                    duration={5}
                    colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                    colorsTime={[10, 6, 3, 0]}
                    onComplete={handleComplete}
                  >
                    {renderTime}
                  </CountdownCircleTimer>
                </div>
              </h4>
            </header>

            <hr />

            <main>
              <>
                <h5 className="pb-2">
                  <b>{fecthedQuestions[currentQuestionIndex]?.question}</b>
                </h5>
                {fecthedQuestions[currentQuestionIndex] &&
                  Object.values(
                    fecthedQuestions[currentQuestionIndex].options
                  ).map((option, index) => (
                    <div key={index} className="mb-2">
                      <Button
                        size="sm"
                        className="mb-2 "
                        color={
                          selectedOptions[currentQuestionIndex] === option
                            ? "primary"
                            : "secondary"
                        }
                        onClick={() => handleOptionClick(option)}
                        block
                      >
                        {option}
                      </Button>
                    </div>
                  ))}
              </>
            </main>
            <hr />
            <footer>
              <div className="mt-3 ">
                <AwesomeButton type="github" onPress={handlePreviousQuestion}>
                  Back
                </AwesomeButton>
                <AwesomeButton
                  type="facebook"
                  onPress={handleNextQuestion}
                  className="ms-2"
                >
                  Next
                </AwesomeButton>
                <AwesomeButton
                  type="instagram"
                  onPress={handleSubmit}
                  className="ms-2"
                >
                  Submit
                </AwesomeButton>
              </div>
            </footer>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Quiz;
