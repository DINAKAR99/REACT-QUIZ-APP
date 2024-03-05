import React from "react";

import { AwesomeButton } from "react-awesome-button";

import { Col, Container, Row } from "reactstrap";
import CustomNavbar from "../../CustomNavbar";
import Sidebar from "../Sidebar";
import { useNavigate } from "react-router-dom";
import { each } from "jquery";

const AllUsers = () => {
  const employees = [
    {
      name: "John Doe",
      email: "john.doe@example.com",
      empId: "EMP001",
    },
    {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      empId: "EMP002",
    },
    {
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      empId: "EMP003",
    },
    {
      name: "Robert Brown",
      email: "robert.brown@example.com",
      empId: "EMP004",
    },
    {
      name: "Emily Davis",
      email: "emily.davis@example.com",
      empId: "EMP005",
    },
  ];

  const nav = useNavigate();

  const getUserInfo = (each) => {
    console.log(each);
    nav("/admin/userInfo", { state: { user: each } });
  };
  console.log(employees);

  return (
    <div>
      <CustomNavbar />
      <Container fluid>
        <Row>
          <Col
            sm="3"
            md="2"
            className="sidebar p-0 fadeleft  "
            style={{ height: "100vh" }}
          >
            <Sidebar />
          </Col>
          <Col>
            <Container>
              <Row>
                <Col md={6}>
                  <div>
                    <h3 className="mt-3 ">
                      <b>&nbsp; Registered Users</b>
                    </h3>
                  </div>
                  {employees &&
                    employees.map((each, index) => {
                      return (
                        <>
                          <div className=" fader border border-grey rounded p-3  mb-2 shadow-lg  bg-white   ">
                            <h5>
                              {index + 1}. {each.name}
                            </h5>

                            <AwesomeButton
                              onPress={() => getUserInfo(each)}
                              className="me-2 "
                              type="linkedin"
                            >
                              More...
                            </AwesomeButton>
                          </div>
                        </>
                      );
                    })}
                </Col>
                <Col md={6}>
                  <div>
                    <h3 className="mt-3 ">
                      <b>&nbsp; -- --</b>
                    </h3>
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

export default AllUsers;
