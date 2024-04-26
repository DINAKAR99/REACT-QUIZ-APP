import React, { useState } from "react";
import CustomNavbar from "../../CustomNavbar";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import Sidebar from "../Sidebar";
import { getAllCategories } from "../../Helper/QuizHelper";
import { AwesomeButton } from "react-awesome-button";
import axios from "axios";

const UserInfoPage = () => {
  const location = useLocation();
  const { user } = location.state;
  console.log(user);
  document.title = "User Quiz Info";

  const [usermail, setUsermail] = useState("");
  const [userName, setUserName] = useState("");
  const [attemptedQuizCategories, setAttemptedQuizCategories] = useState([]);

  const scoreFetcher = async (category) => {
    const response = await axios.get(
      `https://react-quiz-app-001-default-rtdb.asia-southeast1.firebasedatabase.app/questions/${category}/attempted/${userName}/score.json`
    );
    console.log(response.data.percentage);
    return response.data.percentage;
  };
  useState(() => {
    //fecth user from local storage and set to inital values
    const usermail = sessionStorage.getItem("usermail");
    const username = sessionStorage.getItem("usermail").split("@")[0];
    setUsermail((e) => usermail);
    setUserName((e) => usermail.split("@")[0]);

    axios
      .get(
        `https://react-quiz-app-001-default-rtdb.asia-southeast1.firebasedatabase.app/users/${username}/attempted.json`
      )
      .then((response) => {
        console.log(Object.keys(response.data));
        setAttemptedQuizCategories((e) => Object.keys(response.data));
      });
  });

  const navigate = useNavigate();
  const userQuizDetails = (each) => {
    navigate("/admin/userquiz", {
      state: { categoryName: each, user: user },
    });
  };
  return (
    <div>
      <CustomNavbar />
      <Container fluid className="sidebar p-0   ">
        <Row>
          <Col sm="2" md="3">
            <Sidebar />
          </Col>
          <Col>
            <Container>
              <Row>
                <header>
                  <h2 className="text-center  ">
                    User Name : {userName} | Email : {usermail} <br />
                    <hr /> Employee id : {user.empId}
                  </h2>
                </header>
                <Col md={6}>
                  <div>
                    <h4 className="mt-3 ">
                      <b>&nbsp;QUIZ ATTEMPTED</b>
                    </h4>
                  </div>
                  {attemptedQuizCategories &&
                    attemptedQuizCategories.map((each, index) => {
                      return (
                        <>
                          <div className="  border border-grey rounded p-3  mb-2 shadow-lg  bg-white   ">
                            <h5>
                              {index + 1}.{each}
                            </h5>

                            <AwesomeButton
                              onPress={() => userQuizDetails(each)}
                              className="me-2 "
                              type="linkedin"
                            >
                              More ...
                            </AwesomeButton>
                          </div>
                        </>
                      );
                    })}
                </Col>
                <Col md={6}>
                  <div>
                    <h4 className="mt-3 ">
                      <b>&nbsp; QUIZ REMAINING</b>
                    </h4>
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

export default UserInfoPage;
