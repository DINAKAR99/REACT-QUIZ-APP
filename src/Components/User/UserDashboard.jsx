import { motion } from "framer-motion";
import React, { useState } from "react";
import { AwesomeButton } from "react-awesome-button";
import { Button, Col, Container, Row } from "reactstrap";
import CustomNavbar from "../CustomNavbar";
import { Link, useNavigate } from "react-router-dom";
import { Nav, NavItem, NavLink } from "reactstrap";
import Sidebar from "../Admin/Sidebar";
import { getAllCategories } from "../Helper/QuizHelper";

const UserDashboard = () => {
  const text = "WELCOME TO USER DASHBOARD ".split(",");
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
  const [showCategorySelection, setShowCategorySelection] = useState(false);
  const categories = ["react", "java", "spring", "firebase"];

  // Function to handle category selection click
  const handleCategorySelection = () => {
    setShowWelcomeMessage(false);
    setTimeout(() => setShowCategorySelection(true), 200); // Delay the display to allow the fade-in effect
  };

  const [fetchedCategory, setFetchedCategory] = useState([]);

  const navigate = useNavigate();

  const takequiz = (each) => {
    console.log("suddkj");
    navigate("/user/takequiz", {
      state: { categoryName: each },
    });
  };

  useState(() => {
    getAllCategories().then((categoryArray) => {
      setFetchedCategory(categoryArray);
    });
  });
  return (
    <>
      <CustomNavbar />
      <Container fluid>
        <Row>
          <Col sm="3" md="2" className="sidebar p-0 fadeleft  ">
            <Sidebar />
          </Col>
          <Col>
            <Container>
              <Row>
                <Col md={6}>
                  <div>
                    <h3 className="mt-3 ">
                      <b>&nbsp; AVAILABLE QUIZ</b>
                    </h3>
                  </div>
                  {fetchedCategory &&
                    fetchedCategory.map((each, index) => {
                      return (
                        <>
                          <div className=" fader border border-grey rounded p-3  mb-2 shadow-lg  bg-white   ">
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
                          </div>
                        </>
                      );
                    })}
                </Col>
                <Col md={6}>
                  <div>
                    <h3 className="mt-3 ">
                      <b>&nbsp; COMPLETED QUIZ</b>
                    </h3>
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
