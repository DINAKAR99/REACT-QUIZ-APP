import React, { useState } from "react";
import CustomNavbar from "../../CustomNavbar";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Button, Col, Container, Row } from "reactstrap";
import Sidebar from "../Sidebar";
import {
  getAllCategories,
  getAllQuestionsPerCategory,
} from "../../Helper/QuizHelper";
import { AwesomeButton } from "react-awesome-button";
import { Prev } from "react-bootstrap/esm/PageItem";

const UserQuiz = () => {
  const location = useLocation();
  const { categoryName, user } = location.state;
  console.log(categoryName);

  const [questionPack, setQuestionPack] = useState([]);
  const [show, setShow] = useState(false);
  const qPack = [];
  useState(() => {
    const allquestions = getAllQuestionsPerCategory(categoryName)
      .then((questionArray) => {
        questionArray.slice(1, -1).map((question) => {
          console.log(Object.values(question));
          qPack.push(Object.values(question)[0]);
        });
      })
      .then(() => {
        console.log(qPack);
        setQuestionPack(qPack);
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
                      <i class="fa-solid fa-bars"></i>
                    </Button>
                    <h2 className="text-center me-auto   ">
                      User : {user.name} | Empid : {user.empId}
                    </h2>
                  </div>
                </header>
                <Col md={12}>
                  <div>
                    <h4 className="mt-3 ">
                      <b className="text-uppercase">
                        &nbsp;{categoryName} QUIZ
                      </b>
                      <> &nbsp; &nbsp;score : 7/10 (70%)</>
                    </h4>
                  </div>

                  <div
                    className=" faderborder border-grey  shadow-lg bg-white  rounded p-3 mb-2       p-3 mb-2 overflow-y-scroll    "
                    style={{ maxHeight: "405px" }}
                  >
                    <div>
                      <h6 className="mt-3 ">
                        Note : Below are the options chosen for the questions by
                        the user{" "}
                      </h6>
                      <ol type={1}>
                        {questionPack.map((QuestionPacket, index) => (
                          <div key={index} className="mt-3">
                            <li key={index} className="mb-2">
                              <b>{QuestionPacket.question}</b>
                            </li>

                            <ol type="A">
                              {Object.values(QuestionPacket.options) &&
                                Object.values(QuestionPacket.options).map(
                                  (Eachoption, indexx) => {
                                    return (
                                      <li key={indexx}>
                                        <input
                                          type="radio"
                                          value={Eachoption}
                                          checked={
                                            QuestionPacket.correctAnswer ===
                                            Eachoption
                                          }
                                          readOnly
                                        />
                                        {Eachoption}
                                        {QuestionPacket.correctAnswer ===
                                        Eachoption ? (
                                          <i
                                            class="fa-solid fa-check mx-2 "
                                            style={{ color: "green" }}
                                          ></i>
                                        ) : (
                                          ""
                                        )}
                                      </li>
                                    );
                                  }
                                )}
                            </ol>

                            {Object.values(QuestionPacket.options).map((each) =>
                              each == QuestionPacket.correctAnswer ? (
                                <h6 className="mt-2 ">
                                  correct option : &nbsp;
                                  {Object.keys(QuestionPacket.options).find(
                                    (key) =>
                                      QuestionPacket.options[key] ===
                                      QuestionPacket.correctAnswer
                                  )}{" "}
                                </h6>
                              ) : (
                                ""
                              )
                            )}
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
