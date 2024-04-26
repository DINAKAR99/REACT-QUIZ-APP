import React, { useEffect, useState } from "react";
import CustomNavbar from "../CustomNavbar";
import { Col, Container, Row } from "reactstrap";
import Sidebar from "./Sidebar";

import AddQuiz from "./AddQuiz";
import PieActiveArc from "../../Design/PieActiveArc";
import { getAllCategories, getQCount } from "../Helper/QuizHelper";
import axios from "axios";

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
  const [pack2, setPack2] = useState([]);

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
  const fetch2 = () => {
    let attemptedArray = [];
    axios
      .get(
        `https://react-quiz-app-001-default-rtdb.asia-southeast1.firebasedatabase.app/questions.json`
      )
      .then((response) => {
        console.log(response.data);
        const meta = response.data;
        Object.keys(response.data).forEach((key) => {
          console.log(
            meta[key].attempted ? Object.keys(meta[key].attempted).length : 0
          );

          let each_obj = {
            label: key,
            value: meta[key].attempted
              ? Object.keys(meta[key].attempted).length
              : 0,
          };
          attemptedArray.push(each_obj);
        });
      });

    setPack2((e) => attemptedArray);
    console.log(attemptedArray);
  };
  //FILL THE DATA WITH DATA FROM FIREBASE
  useEffect(() => {
    document.title = "Admin Dashboard";
    fetch2();
    fetch().then((data) => {
      console.log(data);
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
            <Col sm="3" md="2" className="sidebar p-0  fadeleft ">
              <Sidebar handleButtonClick={handleSidebarButtonClick} />
            </Col>
            <Col sm="9" md="10" className="main-content">
              <h1 className="text-center">ADMIN DASHBOARD</h1>
              {/* Conditionally render the appropriate form */}

              {selectedForm === "default" && (
                <Container>
                  <Row>
                    <Col md={6}>
                      <div className="border   rounded p-3 shadow-lg ">
                        <b>Questions per Technology</b>
                        <PieActiveArc data={pack} />
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="border   rounded p-3 shadow-lg ">
                        <b> Category wise attempts</b>
                        <PieActiveArc data={pack2} />
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
