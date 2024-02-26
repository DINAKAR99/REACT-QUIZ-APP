import React, { createContext, useEffect, useState } from "react";
import CustomNavbar from "../CustomNavbar";
import { Col, Container, Row } from "reactstrap";
import { Nav, NavItem, NavLink } from "reactstrap";

import AllQuiz from "./AllQuiz";
import AddCategory from "./modals/AddCategory";
import myContext from "../context/ContextCore";

const QuizManager = () => {
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
                      onClick={() => handleSidebarButtonClick("allquiz")}
                    >
                      All quiz
                    </NavLink>
                  </NavItem>

                  <NavItem>
                    <NavLink
                      className=" border-bottom border-black custom  "
                      href="#"
                    >
                      Edit Quiz
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className=" border-bottom border-black custom  "
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

              <AddCategory
                modal={modal3}
                backdrop={backdrop}
                setModal={setModal3}
                setToken={setToken}
              />

              {selectedForm === "allquiz" && <AllQuiz token={token} />}

              {/* Add more conditions for other forms */}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default QuizManager;
