import React, { useState } from "react";
import CustomNavbar from "../CustomNavbar";
import { Col, Container, Row } from "reactstrap";
import { Nav, NavItem, NavLink } from "reactstrap";
import AddQuiz from "./AddQuiz";
import AllQuiz from "./AllQuiz";

const QuizManager = () => {
  //clicked component state management

  const [selectedForm, setSelectedForm] = useState("allquiz");
  // Function to handle button clicks in the sidebar
  const handleSidebarButtonClick = (component_name) => {
    setSelectedForm(component_name);
  };
  return (
    <div>
      <CustomNavbar />

      <div className="admin-dashboard">
        <Container fluid>
          <Row>
            <Col sm="3" md="2" className="sidebar">
              <div
                className="sidebar  rounded  border-3 border-black border    mt-3   "
                style={{ height: "100vh", backgroundColor: "#B4B4B8" }}
              >
                <Nav vertical navbar fill>
                  <NavItem>
                    <NavLink
                      className=" border-bottom border-black custom  "
                      href="#"
                      onClick={() => handleSidebarButtonClick("createQuestion")}
                    >
                      create Question
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className=" border-bottom border-black custom  "
                      href="#"
                      onClick={() => handleSidebarButtonClick("allquiz")}
                    >
                      all quiz
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className=" border-bottom border-black custom  "
                      href="#"
                    >
                      delete
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className=" border-bottom border-black custom  "
                      href="#"
                    >
                      edit quiz
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className=" border-bottom border-black custom  "
                      href="/quizmanage"
                    >
                      Quiz Management
                    </NavLink>
                  </NavItem>
                </Nav>
              </div>
            </Col>
            <Col sm="9" md="10" className="main-content">
              {/* Conditionally render the appropriate form */}
              {selectedForm === "createQuestion" && <AddQuiz />}
              {selectedForm === "allquiz" && <AllQuiz />}
              {/* Add more conditions for other forms */}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default QuizManager;
