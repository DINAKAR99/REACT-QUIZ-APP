import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, Col, Container, Row } from "reactstrap";
import CustomNavbar from "../../CustomNavbar";
import { getAllQuestionsPerCategory } from "../../Helper/QuizHelper";
import Sidebar from "../Sidebar";
import axios from "axios";

const UserQuiz = () => {
  document.title = "user quiz";
  const location = useLocation();
  console.log(localStorage.getItem("EvalCategory"));
  const euser = JSON.parse(localStorage.getItem("EvalUser"));
  console.log(euser);
  const param1 = localStorage.getItem("EvalCategory") || "";
  const param2 = localStorage.getItem("EvalUser")
    ? JSON.parse(localStorage.getItem("EvalUser"))
    : null; // Adjust this default value based on your requirements

  const { categoryName, user } = location.state || {
    categoryName: param1,
    user: param2,
  };

  console.log(categoryName);
  console.log(user);

  const [questionPack, setQuestionPack] = useState([]);
  const [show, setShow] = useState(false);
  const [score, setScore] = useState("");
  const qPack = [];
  useState(() => {
    const allquestions = axios
      .get(
        `https://react-quiz-app-001-default-rtdb.asia-southeast1.firebasedatabase.app/exam/${categoryName}/attempted/${user.name}/answersheet.json`
      )
      .then((questionArray) => {
        questionArray.data
          .filter((each) => each !== null)
          .map((question) => {
            console.log(question);
            qPack.push(question);
          });
      })
      .then(() => {
        console.log(qPack);
        setQuestionPack(qPack);
      });

    //fetch user score
    axios
      .get(
        `https://react-quiz-app-001-default-rtdb.asia-southeast1.firebasedatabase.app/questions/${categoryName}/attempted/${user.name}/score.json`
      )
      .then((response) => {
        console.log(response.data.percentage);
        setScore((e) => response.data.percentage);
      });
  });
  const navigate = useNavigate();
  const userQuizDetails = (each) => {
    navigate("/admin/userquiz", {
      state: { categoryName: each },
    });
  };
  return (
    <div>
      <CustomNavbar />
      <Container fluid className="sidebar p-0   ">
        <Row>
          {show ? (
            <Col md={2}>
              <Sidebar />
            </Col>
          ) : (
            ""
          )}
          <Col>
            <Container>
              <Row>
                <header>
                  <div className="d-flex justify-content-center   ">
                    <Button
                      className=" ms-0  me-auto mt-1     "
                      onClick={() => setShow((prev) => !prev)}
                    >
                      <i className="fa-solid fa-bars"></i>
                    </Button>
                  </div>
                </header>
                <Col md={12}>
                  <div>
                    <h4 className="mt-3 ">
                      <>
                        &nbsp; &nbsp;
                        <dd className="text-capitalize  ">
                          <b className="text-uppercase me-5">
                            &nbsp;{categoryName} QUIZ
                          </b>
                          Username - {user.name}
                          &nbsp; &nbsp;Score-Percentage : {score} %
                        </dd>
                      </>
                    </h4>
                  </div>

                  <div className=" faderborder border-grey  shadow-lg bg-white  rounded p-3 mb-2       p-3 mb-2    ">
                    <div>
                      <i style={{ fontStyle: "italic" }}>
                        Below are the questions attempted by the user with
                        choosen option or written answer
                      </i>

                      <ol type={1}>
                        {questionPack.map((QuestionPacket, index) => (
                          <div key={index} className="mt-3">
                            <li key={index} className="mb-2">
                              <h5>
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html: QuestionPacket.question
                                      ? QuestionPacket.question
                                      : "",
                                  }}
                                ></span>
                              </h5>
                            </li>

                            <h6 className="  ">
                              <b>answered</b> :
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: QuestionPacket.selectedOption,
                                }}
                              ></span>
                              &nbsp;&nbsp;&nbsp;
                              {QuestionPacket.isCorrect ? (
                                <i
                                  className="fa-solid fa-circle-check"
                                  style={{ color: "green" }}
                                ></i>
                              ) : (
                                <i
                                  className="fa-solid fa-circle-xmark"
                                  style={{ color: "maroon" }}
                                ></i>
                              )}
                            </h6>
                          </div>
                        ))}
                      </ol>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UserQuiz;
