import React, { useState } from "react";
import CustomNavbar from "../../CustomNavbar";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import Sidebar from "../Sidebar";
import { getAllCategories } from "../../Helper/QuizHelper";
import { AwesomeButton } from "react-awesome-button";

const UserInfoPage = () => {
  const location = useLocation();
  const { user } = location.state;
  console.log(user);

  const [fetchedCategory, setFetchedCategory] = useState([]);

  useState(() => {
    getAllCategories().then((categoryArray) => {
      setFetchedCategory(categoryArray);
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
                    User Name : {user.name} | Employee id : {user.empId}
                  </h2>
                </header>
                <Col md={6}>
                  <div>
                    <h4 className="mt-3 ">
                      <b>&nbsp;QUIZ ATTEMPTED</b>
                    </h4>
                  </div>
                  {fetchedCategory &&
                    fetchedCategory.map((each, index) => {
                      return (
                        <>
                          <div className="  border border-grey rounded p-3  mb-2 shadow-lg  bg-white   ">
                            <h5>
                              {index + 1}.{each}
                            </h5>
                            <h5>scored : 7/10 (70%)</h5>
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
