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
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

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
  const [user, setUser] = useState("");
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

  useEffect(() => {
    sessionStorage.setItem("selectedOptions", JSON.stringify(selectedOptions));
    console.log(countdownEndTime);

    console.log(selectedOptions);
  }, [selectedOptions]);

  useEffect(() => {
    getAllQuestionsPerCategory(categoryName).then((resultSet) => {
      let rawArray = [];
      console.log(resultSet);
      rawArray = resultSet.slice(1);
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

    if (sessionStorage.getItem(`${categoryName}`)) {
      toast.error("quiz already attempted");
      setTimeout(() => {
        window.location.href = "/user/userDashboard";
      }, 600);
    } else if (sessionStorage.getItem(`${categoryName}-quiz`)) {
      toast.error("quiz already attempted");
      // sessionStorage.removeItem(`${categoryName}-test`);
      setTimeout(() => {
        window.location.href = "/user/userDashboard";
      }, 600);
    } else {
      // sessionStorage.setItem(`${categoryName}-quiz`, "attempted");
    }
  }, []);

  useEffect(() => {
    const user = sessionStorage.getItem("usermail").split("@")[0];
    setUser(user);
  });
  const handleOptionClick = (option, correctAnswer, realquestionId) => {
    console.log("real question id", realquestionId);
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
        realquestionId: realquestionId,
      };

      setUserResponses(updatedResponses);
    }

    // Create a new user response object
    else {
      const newUserResponse = {
        questionId: currentQuestionIndex, // Assuming question index serves as question ID
        category: categoryName, // Replace 'YourCategory' with the actual category
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

  const handleButtonPallete = (index) => {
    console.log(JSON.parse(sessionStorage.getItem("countdownEndTime")));
    setCurrentQuestionIndex(index);
  };
  const calcPercentage = () => {
    const percentage = (marks / fecthedQuestions?.length) * 100;
    return percentage.toFixed(2);
  };
  const handleNextQuestion = () => {
    if (currentQuestionIndex < fecthedQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      // setSelectedOption(null); // Reset selected option for the next question
    }
  };
  const handleSubmit = () => {
    // sessionStorage.removeItem("selectedOptions");
    console.log(userResponses);
    console.log("correct attempted questions", marks);
    console.log("total attempted questions", fecthedQuestions?.length);
    console.log("percentage secured", calcPercentage());

    console.log(marks);

    sessionStorage.removeItem("countdownEndTime");

    setQuizSubmitted(true);

    //api call to hit the marks sheet endpoint of particular category
    axios.put(
      `https://react-quiz-app-001-default-rtdb.asia-southeast1.firebasedatabase.app/exam/${categoryName}/attempted/${user}/answersheet.json`,
      userResponses
    );

    axios.put(
      `https://react-quiz-app-001-default-rtdb.asia-southeast1.firebasedatabase.app/exam/${categoryName}/attempted/${user}//evalution.json`,
      {
        status: "pending",
        quizResult: "pending",
      }
    );
    //api call to hit the user specific node and add to attempted node
    axios.put(
      `https://react-quiz-app-001-default-rtdb.asia-southeast1.firebasedatabase.app/users/${user}/attempted/${categoryName}.json`,
      { attempted: true, Resultstatus: "pending at examiner" }
    );
    //api call to hit the user score  endpoint of particular category conatins percentage , attempted correct and total number of exam
    axios.put(
      `https://react-quiz-app-001-default-rtdb.asia-southeast1.firebasedatabase.app/questions/${categoryName}/attempted/${user}/score.json`,
      {
        percentage: calcPercentage(),
        attemptedCorrect: marks,
        totalQuestions: fecthedQuestions?.length,
      }
    );
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
    <Container fluid className="d-flex p-0 " style={{ userSelect: "none" }}>
      <div
        style={{ width: 220 }}
        className="right border-3 border-top-0 border-bottom-0    border border-dark    "
      >
        <h5 className="text-center  ">Question Pallete</h5>

        <hr />
        <div className="d-flex flex-wrap gap-3 ps-2 ">
          {fecthedQuestions?.map((q, index) => {
            return (
              <Button
                key={index}
                onClick={() => handleButtonPallete(index)}
                active={true}
                color={index === currentQuestionIndex ? "primary" : "secondary"}
                className="mt-2  "
              >
                {index + 1}
              </Button>
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
              <div>
                <i>Note: Do not refresh the page while taking quiz</i>
              </div>
              <header className="d-flex mt-5  ">
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
                    <b>
                      {currentQuestionIndex + 1}.&nbsp;
                      {fecthedQuestions[currentQuestionIndex]?.question}
                    </b>
                  </h5>
                  {fecthedQuestions[currentQuestionIndex] &&
                  fecthedQuestions[currentQuestionIndex].options ? (
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
                                .correctAnswer,
                              fecthedQuestions[currentQuestionIndex].questionId
                            )
                          }
                        ></Radio>
                        {option}
                        {fecthedQuestions[currentQuestionIndex].questionId}
                      </div>
                    ))
                  ) : (
                    <h4>
                      <CKEditor
                        editor={ClassicEditor}
                        data="write the answer here "
                        onReady={(editor) => {
                          // You can store the "editor" and use when it is needed.
                          console.log("Editor is ready to use!", editor);
                        }}
                        onChange={(event) => {
                          console.log(event);
                        }}
                        onBlur={(event, editor) => {
                          console.log("Blur.", editor);
                        }}
                        onFocus={(event, editor) => {
                          console.log("Focus.", editor);
                        }}
                      />
                    </h4>
                  )}
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
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Quiz;
