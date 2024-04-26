import React, { useEffect, useState } from "react";
import { Col, Container, Nav, NavItem, NavLink, Row } from "reactstrap";
import CustomNavbar from "../CustomNavbar";

import AllQuiz from "./AllQuiz";
import AddCategory from "./modals/AddCategory";

const QuizDashboard = () => {
  document.title = "Quiz Dashboard";
  //clicked component state management
  const [selectedForm, setSelectedForm] = useState("allquiz");
  //modal state
  const [modal3, setModal3] = useState(false);
  const [token, setToken] = useState(0);
  const [backdrop, setBackdrop] = useState(true);
  useEffect(() => {
    console.log("in useeffect ");
  }, [token]);
  //refreshtoken

  //category toggle
  const createCategory = () => {
    setModal3(!modal3);
  };
  // Function to handle button clicks in the sidebar
  const handleSidebarButtonClick = (component_name) => {
    setSelectedForm(component_name);
  };

  return (
    <div>
      <CustomNavbar />
      <AddCategory
        modal={modal3}
        backdrop={backdrop}
        setModal={setModal3}
        setToken={setToken}
      />
      <div className="admin-dashboard">
        <Container fluid>
          <Row>
            <Col sm="3" md="2" className="sidebar text-white p-0  ">
              <div
                className="sidebar  position-fixed  border-3 bg-black  "
                style={{
                  height: "100vh",
                  width: "30vh",
                  backgroundColor: "#212529",
                }}
              >
                <Nav vertical navbar fill>
                  <NavItem>
                    <NavLink
                      className=" border-top      border-bottom border-opacity-50      border-white  custom "
                      href="dashboard"
                    >
                      Admin Dashboard
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className=" border-top   border-bottom border-opacity-50      border-white  custom "
                      href="quiz"
                    >
                      Quiz Management
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className=" border-bottom border-white border-opacity-50   custom "
                      href="allusers"
                    >
                      Candidates
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className=" border-bottom border-white border-opacity-50   custom "
                      href="evaluate"
                    >
                      Evaluation
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className=" border-bottom border-white border-opacity-50 custom  "
                      href="/admin/unlockQuiz"
                    >
                      Unlock Quiz
                    </NavLink>
                  </NavItem>

                  <NavItem>
                    <NavLink
                      className=" border-bottom border-white border-opacity-50 custom  "
                      onClick={() => createCategory()}
                    >
                      Add New Category
                    </NavLink>
                  </NavItem>
                </Nav>
              </div>
            </Col>
            <Col sm="9" md="10" className="main-content">
              {/* Conditionally render the appropriate form */}

              <AllQuiz token={token} />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default QuizDashboard;
