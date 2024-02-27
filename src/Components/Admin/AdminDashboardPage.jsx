import React, { useEffect, useState } from "react";
import CustomNavbar from "../CustomNavbar";
import { Col, Container, Row } from "reactstrap";
import Sidebar from "./Sidebar";

import AddQuiz from "./AddQuiz";
import PieActiveArc from "../../Design/PieActiveArc";
import { getAllCategories, getQCount } from "../Helper/QuizHelper";

const AdminDashboardPage = () => {
  // ------------------------
  //clicked component state management
  const [selectedForm, setSelectedForm] = useState("default");
  // Function to handle button clicks in the sidebar
  const handleSidebarButtonClick = (component_name) => {
    setSelectedForm(component_name);
  };
  // states
  // ------------------------
  const [pack, setPack] = useState([]);

  // ---------------------------
  // variables
  const data = [
    { value: 10, label: "java" },
    { value: 20, label: "jsp" },
    { value: 70, label: "react" },
    { value: 30, label: "reacst" },
    { value: 36, label: "reacst" },
  ];
  const fetch = async () => {
    let dataArray = [];
    const categories = await getAllCategories();

    const promises = categories.map((category) =>
      getQCount(category).then((Response) => {
        return Response.data;
      })
    );

    const results = await Promise.all(promises);

    for (const key in results) {
      let object = {
        value: Object.values(results[key])[0],
        label: categories[key],
      };
      dataArray.push(object);

      console.log(Object.values(results[key])[0]);
    }

    console.log(dataArray);

    return dataArray;
  };
  //FILL THE DATA WITH DATA FROM FIREBASE
  useEffect(() => {
    fetch().then((data) => {
      setPack(data);
    });
  }, []);

  // ---------------------------
  return (
    <div>
      <CustomNavbar />

      <div className="admin-dashboard">
        <Container fluid>
          <Row>
            <Col sm="3" md="2" className="sidebar p-0  ">
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
                      <div className="border   rounded p-3 shadow-lg ">
                        <b>Technologies</b>
                        <PieActiveArc data={pack} />
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="border   rounded p-3 shadow-lg ">
                        <b>Performance Per Category</b>
                        <PieActiveArc
                          data={pack}
                          colors={["#B47B84", "#7E6363", "#E1C78F"]}
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
