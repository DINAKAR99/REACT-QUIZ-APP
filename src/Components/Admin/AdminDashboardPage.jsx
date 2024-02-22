import React, { useState } from "react";
import CustomNavbar from "../CustomNavbar";
import { Col, Container, Row } from "reactstrap";
import Sidebar from "./Sidebar";

import AddQuiz from "./AddQuiz";
import PieActiveArc from "../../Design/PieActiveArc";

const AdminDashboardPage = () => {
  // ------------------------
  //clicked component state management
  const [selectedForm, setSelectedForm] = useState("default");
  // Function to handle button clicks in the sidebar
  const handleSidebarButtonClick = (component_name) => {
    setSelectedForm(component_name);
  };
  // ------------------------

  // ---------------------------
  // variables
  const data = [
    { id: 0, value: 10, label: "java" },
    { id: 1, value: 20, label: "jsp" },
    { id: 2, value: 70, label: "react" },
  ];
  // ---------------------------
  return (
    <div>
      <CustomNavbar />

      <div className="admin-dashboard">
        <Container fluid>
          <Row>
            <Col sm="3" md="2" className="sidebar ">
              <Sidebar handleButtonClick={handleSidebarButtonClick} />
            </Col>
            <Col sm="9" md="10" className="main-content">
              <h1 className="text-center">DASHBOARD</h1>
              {/* Conditionally render the appropriate form */}
              {selectedForm === "createQuestion" && <AddQuiz />}
              {selectedForm === "default" && (
                <Container>
                  <Row>
                    <Col md={6}>
                      <div className="border border-dark rounded p-3">
                        Technologies
                        <PieActiveArc />
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="border border-dark rounded p-3">
                        Performance Per Category
                        <PieActiveArc
                          colors={["#B47B84", "#7E6363", "#E1C78F"]}
                          data={data}
                        />
                      </div>
                    </Col>
                  </Row>
                </Container>
              )}
              {/* Add more conditions for other forms */}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
