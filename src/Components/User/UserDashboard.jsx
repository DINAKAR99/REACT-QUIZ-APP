import axios from "axios";
import React, { useEffect, useState } from "react";
import { AwesomeButton } from "react-awesome-button";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import CustomNavbar from "../CustomNavbar";
import { getAllCategories } from "../Helper/QuizHelper";
import ScrollToTop from "react-scroll-to-top";
import { Skeleton } from "@mui/material";

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
    axios
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

  // Get the button

  // When the user scrolls down 20px from the top of the document, show the button
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // Show skeletons for 5 seconds

    return () => clearTimeout(timer); // Clear the timer if the component is unmounted
  }, []);
  return (
    <>
      <CustomNavbar />{" "}
      <Container fluid className="cont vh-100 ">
        <Row>
          <h1 className=" text-center fw-bold    ">Dashboard</h1>
          <Col>
            <Container>
              <Row className="sidebar ">
                <Col md={6}>
                  <div className="unlocked ">
                    <h4 className=" text-center mb-3 ">
                      <b>ALL QUIZ</b>
                    </h4>

                    {loading ? (
                      <>
                        <Skeleton
                          animation="wave"
                          variant="rectangular"
                          className="rounded rounded-2 mb-1  "
                          style={{ width: "100%" }}
                          height={100}
                        />
                        <Skeleton
                          animation="wave"
                          variant="rectangular"
                          className="rounded rounded-2 mb-1  "
                          style={{ width: "100%" }}
                          height={100}
                        />
                        <Skeleton
                          animation="wave"
                          variant="rectangular"
                          className="rounded rounded-2 mb-1  "
                          style={{ width: "100%" }}
                          height={100}
                        />
                        <Skeleton
                          animation="wave"
                          variant="rectangular"
                          className="rounded rounded-2 mb-1  "
                          style={{ width: "100%" }}
                          height={100}
                        />
                      </>
                    ) : (
                      ""
                    )}
                    {fetchedCategory &&
                      fetchedCategory.map((each, index) => {
                        if (categoryStatus[each]) {
                          return (
                            <>
                              <div
                                key={index}
                                className=" fader border border-grey rounded p-3  mb-2 shadow-lg  bg-white   "
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
                <Col md={6} className="">
                  <div>
                    <h4 className="mt-2 text-center ">
                      <b>&nbsp; ATTEMPTED QUIZ</b>
                    </h4>
                    {loading ? (
                      <>
                        <Skeleton
                          animation="wave"
                          variant="rectangular"
                          className="rounded rounded-2 mb-1  "
                          style={{ width: "100%" }}
                          height={100}
                        />
                        <Skeleton
                          animation="wave"
                          variant="rectangular"
                          className="rounded rounded-2 mb-1  "
                          style={{ width: "100%" }}
                          height={100}
                        />
                        <Skeleton
                          animation="wave"
                          variant="rectangular"
                          className="rounded rounded-2 mb-1  "
                          style={{ width: "100%" }}
                          height={100}
                        />
                        <Skeleton
                          animation="wave"
                          variant="rectangular"
                          className="rounded rounded-2 mb-1  "
                          style={{ width: "100%" }}
                          height={100}
                        />
                      </>
                    ) : (
                      ""
                    )}
                    {attemptedCategories.length > 0 ? (
                      <div>
                        {attemptedCategories.map((each, index) => {
                          return (
                            <div className="  fader border border-grey rounded p-3 pb-4  mb-2 shadow-lg  bg-white   ">
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
      <ScrollToTop smooth height="15" width="15" />
      <footer className="bg-dark text-center py-3   text-white-50  ">
        BrainyBits © 2024 All Rights Reserved.
      </footer>
    </>
  );
};

export default UserDashboard;
