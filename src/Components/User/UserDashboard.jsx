import axios from "axios";
import React, { useState } from "react";
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

  const navigate = useNavigate();

  const takequiz = (each) => {
    console.log("suddkj");
    navigate("/user/takequiz", {
      state: { categoryName: each },
    });
  };

  useState(() => {
    const user = sessionStorage.getItem("usermail").split("@")[0];
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
                    <b>
                      &nbsp; <h4>UNLOCKED QUIZ</h4>
                    </b>

                    {fetchedCategory &&
                      fetchedCategory.map((each, index) => {
                        if (categoryStatus[each]) {
                          return (
                            <>
                              <div className="fader border border-grey rounded p-3  mb-2 shadow-lg  bg-white   ">
                                <h5>
                                  {index + 1}.{each}
                                </h5>

                                <AwesomeButton
                                  onPress={() => takequiz(each)}
                                  className="me-2 "
                                  type="linkedin"
                                >
                                  Take Quiz
                                </AwesomeButton>
                                {/* <Fab size="large" className="  rounded-0    "> */}
                                {/* ss */}
                                {/* </Fab> */}
                              </div>
                            </>
                          );
                        }
                        return null;
                      })}
                  </div>
                  <div className="locked">
                    <b>
                      &nbsp; <h4>LOCKED QUIZ</h4>
                    </b>
                    <h3 className="mt-5 "></h3>
                    {fetchedCategory &&
                      fetchedCategory.map((each, index) => {
                        if (!categoryStatus[each]) {
                          return (
                            <>
                              <div className="fader border border-grey rounded p-3  mb-2 shadow-lg  bg-white   ">
                                <h5>
                                  {index + 1}.{each}
                                  &nbsp;
                                  <i className="fa-solid fa-lock text-black-50     "></i>
                                </h5>
                              </div>
                            </>
                          );
                        }
                        return null;
                      })}
                  </div>
                </Col>
                <Col md={6}>
                  <div>
                    <h3 className="mt-3 ">
                      <b>&nbsp; COMPLETED QUIZ</b>
                    </h3>
                    <>
                      <div className=" fader border border-grey rounded p-3  mb-2 shadow-lg  bg-white   ">
                        <h5>1.Hibernate</h5>
                        <h6>
                          <b>Result</b> : Pending &nbsp;
                          <i
                            className="fa-regular fa-hourglass-half"
                            // style={{ color: "navy" }}
                          ></i>
                        </h6>
                      </div>
                      <div className=" fader border border-grey rounded p-3  mb-2 shadow-lg  bg-white   ">
                        <h5>2.python</h5>
                        <h6>
                          <b>Result</b> : passed &nbsp;
                          <i
                            className="fa-solid fa-check"
                            style={{ color: "green" }}
                          ></i>
                        </h6>
                      </div>
                      <div className=" fader border border-grey rounded p-3  mb-2 shadow-lg  bg-white   ">
                        <h5>2.Microservices</h5>
                        <h6>
                          <b>Result</b> : failed &nbsp;
                          <i
                            className="fa-solid fa-xmark"
                            style={{ color: "red" }}
                          ></i>
                        </h6>
                      </div>
                    </>
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
