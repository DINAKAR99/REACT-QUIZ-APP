import React, { useCallback, useEffect, useState } from "react";
import { AwesomeButton } from "react-awesome-button";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Button, Col, Container, Row } from "reactstrap";
import { getAllQuestionsPerCategory } from "../Helper/QuizHelper";
import QuizCompletionPage from "./QuizCompletionPage";
import { Prev } from "react-bootstrap/esm/PageItem";
import { MoonLoader } from "react-spinners";
import { Radio } from "@mui/material";
import Countdown from "react-countdown";

const Quiz = ({ categoryName }) => {
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
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [marks, setMarks] = useState(0);
  const [fecthedQuestions, setFetchedQuestions] = useState([]);
  // const [selectedOption, setSelectedOption] = useState(null);
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
    getAllQuestionsPerCategory(categoryName).then((resultSet) => {
      let rawArray = [];
      console.log(resultSet.slice(1, -1));
      rawArray = resultSet.slice(1, -1);
      rawArray = rawArray.map((each) => Object.values(each)[0]);

      setFetchedQuestions(rawArray);

      console.log(rawArray);
      setLoading(false);
    });
  }, []);
  const handleOptionClick = (option, correctAnswer) => {
    const questionId = currentQuestionIndex; // Assuming question index serves as question ID
    // check if option and correctAnswer
    const isCorrect = option === correctAnswer;
    const existingResponseIndex = userResponses.findIndex(
      (each) => each.questionId == questionId
    );

    if (existingResponseIndex !== -1) {
      const updatedResponses = [...userResponses];
      if (isCorrect && !updatedResponses[existingResponseIndex].isCorrect) {
        setMarks((Prev) => Prev + 1);
      } else if (
        !isCorrect &&
        updatedResponses[existingResponseIndex].isCorrect
      ) {
        // Decrement marks if the response changes from correct to wrong
        setMarks((prevMarks) => prevMarks - 1);
      }

      updatedResponses[existingResponseIndex] = {
        ...updatedResponses[existingResponseIndex],
        selectedOption: option,
        isCorrect: isCorrect,
      };

      setUserResponses(updatedResponses);
    }

    // Create a new user response object
    else {
      const newUserResponse = {
        questionId: currentQuestionIndex, // Assuming question index serves as question ID
        category: "YourCategory", // Replace 'YourCategory' with the actual category
        selectedOption: option,
        isCorrect: isCorrect,
      };

      if (isCorrect) {
        setMarks((prev) => prev + 1);
      }

      // Update user responses state by adding the new response
      setUserResponses([...userResponses, newUserResponse]);
    }

    setSelectedOptions({
      ...selectedOptions,
      [currentQuestionIndex]: option,
    });
  };
  // Inside your Quiz <component>       </component>
  const handleComplete = () => {
    console.log("Countdown timer completed!");
    handleSubmit();
    // Perform any other actions you want <here></here>
    // return { shouldRepeat: true, delay: 1 };
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < fecthedQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      // setSelectedOption(null); // Reset selected option for the next question
    }
  };
  const handleSubmit = () => {
    console.log(userResponses);
    console.log(marks);

    setQuizSubmitted(true);
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      // setSelectedOption(null); // Reset selected option for the previous question
    }
  };

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      handleSubmit();
      // Render a completed state
      // return <Completionist />;
    } else {
      // Render a countdown
      return (
        <h5>
          Time Remaining : {hours}:{minutes}:{seconds}
        </h5>
      );
    }
  };

  return (
    <Container fluid>
      <Row className="d-flex justify-content-center mt-5 ">
        <Col md={12} style={{ minHeight: "400px" }}>
          <div>
            {loading ? (
              <div
                className="border rounded-3     shadow-lg   text-center  d-flex justify-content-center align-items-center "
                style={{ minHeight: "400px" }}
              >
                <MoonLoader color="#000000" />
              </div>
            ) : quizSubmitted ? (
              <div className=" shadow-lg ">
                <QuizCompletionPage
                  marks={marks && marks}
                  question_count={fecthedQuestions?.length}
                />
              </div>
            ) : (
              <div className="  p-4 shadow-lg ">
                <header className="d-flex  ">
                  <b>
                    Question {currentQuestionIndex + 1}/
                    {fecthedQuestions.length}
                  </b>

                  <h4 className="ms-auto">
                    <Countdown date={Date.now() + 200000} renderer={renderer} />
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
                          <Radio
                            className={`${fecthedQuestions[currentQuestionIndex].questionId}${categoryName} `}
                            checked={
                              selectedOptions[currentQuestionIndex] === option
                            }
                            onChange={() =>
                              handleOptionClick(
                                option,
                                fecthedQuestions[currentQuestionIndex]
                                  .correctAnswer
                              )
                            }
                          ></Radio>
                          {option}
                          {/* <Button
                            size="sm"
                            className="mb-2 "
                            color={
                              selectedOptions[currentQuestionIndex] === option
                                ? "primary"
                                : "secondary"
                            }
                            onClick={() =>
                              handleOptionClick(
                                option,
                                fecthedQuestions[currentQuestionIndex]
                                  .correctAnswer
                              )
                            }
                            disabled={
                              selectedOptions[currentQuestionIndex] === option
                                ? true
                                : false
                            }
                            block
                          >
                            {option}
                          </Button> */}
                        </div>
                      ))}
                  </>
                </main>
                <hr />
                <footer>
                  <div className="mt-3 d-flex  ">
                    <AwesomeButton
                      type="github"
                      onPress={handlePreviousQuestion}
                    >
                      Back
                    </AwesomeButton>
                    <AwesomeButton
                      type="facebook"
                      onPress={handleNextQuestion}
                      className="ms-2 me-auto "
                    >
                      Next
                    </AwesomeButton>
                    <AwesomeButton
                      type="instagram"
                      onPress={handleSubmit}
                      className="    "
                    >
                      Submit
                    </AwesomeButton>
                  </div>
                </footer>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Quiz;
