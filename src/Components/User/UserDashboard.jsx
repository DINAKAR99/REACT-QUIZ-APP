import axios from "axios";
import React, { useEffect, useState } from "react";
import { AwesomeButton } from "react-awesome-button";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import CustomNavbar from "../CustomNavbar";
import { getAllCategories } from "../Helper/QuizHelper";

const UserDashboard = () => {
  const text = "WELCOME TO USER DASHBOARD ".split(",");

  const categories = ["react", "java", "spring", "firebase"];

  const [fetchedCategory, setFetchedCategory] = useState([]);
  const [categoryStatus, setCategoryStatus] = useState([]);
  const [attemptedCategories, setAttemptedQuizCategories] = useState([]);
  const [attemptedQuizMetaData, setAttemptedQuizMetaData] = useState([]);

  const navigate = useNavigate();

  const takequiz = (each) => {
    console.log("suddkj");
    navigate("/user/takequiz", {
      state: { categoryName: each },
    });
  };

  useEffect(() => {
    document.title = "User Dashboard";
    const user = sessionStorage.getItem("usermail").split("@")[0];

    const attemptedQuizCategories = axios
      .get(
        `https://react-quiz-app-001-default-rtdb.asia-southeast1.firebasedatabase.app/users/${user}/attempted.json`
      )
      .then((response) => {
        console.log(Object.keys(response.data));
        setAttemptedQuizCategories((e) => Object.keys(response.data));
        setAttemptedQuizMetaData((e) => response.data);
      });
    getAllCategories().then((categoryArray) => {
      setFetchedCategory((e) => categoryArray);
      const promises = categoryArray.map((category) =>
        axios.get(
          `https://react-quiz-app-001-default-rtdb.asia-southeast1.firebasedatabase.app/questions/${category}/unlocked.json`
        )
      );

      Promise.all(promises).then((responses) => {
        const categoryStatus = {};
        responses.forEach((response, index) => {
          console.log(response.data);
          const usernameExists = response.data
            ? response.data.includes(user)
            : false;

          categoryStatus[categoryArray[index]] = usernameExists;
        });

        setCategoryStatus((e) => categoryStatus);
      });
    });
  }, []);
  const view = () => {
    console.log(categoryStatus);
  };
  return (
    <>
      <CustomNavbar />
      <Container fluid>
        <Row>
          {/* <Col sm="3" md="2" className="sidebar p-0 fadeleft  ">
            <UserSidebar />
          </Col> */}
          <Col>
            <Container>
              <Row className="sidebar">
                <Col md={6}>
                  <div className="unlocked ">
                    &nbsp;
                    <h4>
                      <b>ALL QUIZ</b>
                    </h4>
                    {fetchedCategory &&
                      fetchedCategory.map((each, index) => {
                        if (categoryStatus[each]) {
                          return (
                            <>
                              <div
                                key={index}
                                className="fader border border-grey rounded p-3  mb-2 shadow-lg  bg-white   "
                              >
                                <h5>
                                  {index + 1}.{each}
                                </h5>

                                {attemptedCategories.includes(each) ? (
                                  <button
                                    className="btn "
                                    style={{ backgroundColor: "lightblue" }}
                                  >
                                    <b>attempted</b>
                                    &nbsp;
                                    <i className="fa-solid fa-circle-check"></i>
                                  </button>
                                ) : (
                                  <AwesomeButton
                                    onPress={() => takequiz(each)}
                                    className="me-2 "
                                    type="linkedin"
                                  >
                                    Take Quiz{" "}
                                  </AwesomeButton>
                                )}
                              </div>
                            </>
                          );
                        }
                        return (
                          <>
                            <div
                              key={index}
                              className="fader border border-grey rounded p-3  mb-2 shadow-lg  bg-white   "
                            >
                              <h5>
                                {index + 1}.{each}
                                &nbsp;
                                <i className="fa-solid fa-lock text-black-50 fa-xs    "></i>
                              </h5>
                            </div>
                          </>
                        );
                      })}
                  </div>
                </Col>
                <Col md={6}>
                  <div>
                    <h4 className="mt-3 ">
                      <b>&nbsp; ATTEMPTED QUIZ</b>
                    </h4>
                    {attemptedCategories.length > 0 ? (
                      <div>
                        {attemptedCategories.map((each, index) => {
                          return (
                            <div className=" fader border border-grey rounded p-3  mb-2 shadow-lg  bg-white   ">
                              <h5>
                                {index + 1}.{each}
                              </h5>
                              <h6>
                                <b>Result</b> -&nbsp;
                                {attemptedQuizMetaData[each].Resultstatus}
                                &nbsp;
                                {attemptedQuizMetaData[each].Resultstatus ===
                                "pending at examiner" ? (
                                  <i className="fa-regular fa-hourglass-half"></i>
                                ) : attemptedQuizMetaData[each].Resultstatus ===
                                  "passed" ? (
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
                          );
                        })}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserDashboard;
