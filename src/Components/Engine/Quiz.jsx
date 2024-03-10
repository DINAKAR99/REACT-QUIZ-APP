import { Radio } from "@mui/material";
import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";

import { MoonLoader } from "react-spinners";
import {
  Button,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { getAllQuestionsPerCategory } from "../Helper/QuizHelper";
import QuizCompletionPage from "./QuizCompletionPage";
import toast from "react-hot-toast";

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

  // Inside your Quiz component

  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [marks, setMarks] = useState(0);
  const [fecthedQuestions, setFetchedQuestions] = useState([]);
  // const [selectedOption, setSelectedOption] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [selectedOptions, setSelectedOptions] = useState(() => {
    const storedOptions = sessionStorage.getItem("selectedOptions");
    return storedOptions ? JSON.parse(storedOptions) : {};
  });

  const [countdownEndTime, setCountdownEndTime] = useState(Date.now() + 300000);

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const [userResponses, setUserResponses] = useState([]);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    sessionStorage.setItem("selectedOptions", JSON.stringify(selectedOptions));
    console.log(countdownEndTime);

    console.log(selectedOptions);
  }, [selectedOptions]);

  const [reloadCount, setReloadCount] = useState(0); // Initialize to 1

  useEffect(() => {
    getAllQuestionsPerCategory(categoryName).then((resultSet) => {
      let rawArray = [];
      console.log(resultSet.slice(1, -1));
      rawArray = resultSet.slice(1, -1);
      rawArray = rawArray.map((each) => Object.values(each)[0]);

      setFetchedQuestions(rawArray);

      console.log(rawArray);
      setLoading(false);
      //setting time
      sessionStorage.setItem(
        "countdownEndTime",
        JSON.stringify(countdownEndTime)
      );
    });

    if (localStorage.getItem(`${categoryName}-test`)) {
      console.log("yeah visited");
      toast.error("redirecting...");
      localStorage.removeItem(`${categoryName}-test`);
      setTimeout(() => {
        window.location.href = "/user/userDashboard";
      }, 900);
    } else {
      localStorage.setItem(`${categoryName}-test`, "visited");
    }
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

  const handleButtonPallete = (index) => {
    console.log(JSON.parse(sessionStorage.getItem("countdownEndTime")));
    setCurrentQuestionIndex(index);
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
    localStorage.setItem(`${categoryName}`, true);
    sessionStorage.removeItem("countdownEndTime");

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
          Time Remaining :{" "}
          {hours ? (hours < 9 ? `0${hours}:` : `${hours}:`) : ""}
          {minutes < 9 ? `0${minutes}` : minutes}:
          {seconds < 9 ? `0${seconds}` : seconds}
        </h5>
      );
    }
  };

  // return;

  return (
    <Container fluid className="d-flex p-0   ">
      <div
        // inert={disabled ? "" : undefined}
        style={{ width: 220 }}
        className="right border-3 border-top-0 border-bottom-0    border border-dark    "
      >
        <h5 className="text-center  ">Question Pallete</h5>

        <hr />
        <div className="d-flex flex-wrap gap-3 ps-2 ">
          {/* <Row> */}
          {/* <div className="questions border p-4  "> */}
          {fecthedQuestions?.map((q, index) => {
            return (
              // <Col md={3}>
              <Button
                key={index}
                onClick={() => handleButtonPallete(index)}
                active={true}
                color={index === currentQuestionIndex ? "primary" : "secondary"}
                className="mt-2  "
              >
                {index + 1}
              </Button>
              // </Col>
            );
          })}
        </div>
      </div>
      <div style={{ height: "100vh", width: "100vw" }}>
        <div className="h-100  ">
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
            <div className="  p-4 shadow-lg h-100   ">
              <header className="d-flex  ">
                <b>
                  Question {currentQuestionIndex + 1}/{fecthedQuestions.length}
                </b>

                <h4 className="ms-auto">
                  <Countdown date={countdownEndTime} renderer={renderer} />
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
                      </div>
                    ))}
                </>
              </main>
              <hr />
              <footer style={{}}>
                <div className="mt-3 d-flex  ">
                  <Button onClick={handlePreviousQuestion}>Back</Button>
                  {currentQuestionIndex + 1 < fecthedQuestions.length ? (
                    <Button
                      className="ms-2 me-auto "
                      onClick={handleNextQuestion}
                    >
                      Next
                    </Button>
                  ) : (
                    ""
                  )}
                </div>

                <Modal isOpen={modal} toggle={toggle} size="sm" centered>
                  <ModalHeader toggle={toggle}> </ModalHeader>
                  <ModalBody className="text-center  ">
                    Are you sure you want to submit ?
                  </ModalBody>
                  <ModalFooter className="d-flex  justify-content-center border-0   ">
                    <Button
                      color="primary"
                      onClick={handleSubmit}
                      className="px-4 "
                    >
                      yes
                    </Button>{" "}
                    <Button
                      color="secondary"
                      className="px-4  "
                      onClick={toggle}
                    >
                      No
                    </Button>
                  </ModalFooter>
                </Modal>
              </footer>

              <hr />
              <div className=" position-absolute  bottom-0 end-0  ">
                <div className=" p-4  ">
                  <Button className="bg-dark  ms-auto  " onClick={toggle}>
                    Submit
                  </Button>
                </div>
              </div>
              <div className=" position-absolute  bottom-0 start-0  ">
                <div className=" p-4  ">
                  <Button className="bg-dark  ms-auto  " onClick={toggle}>
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Quiz;
