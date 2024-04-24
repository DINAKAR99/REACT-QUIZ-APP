import React, { useEffect, useState } from "react";

import { AwesomeButton } from "react-awesome-button";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import CustomNavbar from "../../CustomNavbar";
import Sidebar from "../Sidebar";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://react-quiz-app-001-default-rtdb.asia-southeast1.firebasedatabase.app/users.json"
      )
      .then((res) => {
        let userArr = [];
        console.log(res.data);
        const keys = Object.keys(res.data);
        keys.forEach((key) => {
          userArr.push({
            name: key,
            email: `${key}@gmail.com`,
            empId: "EMP002",
          });
          console.log(key);
          console.log(userArr);
          setUsers((e) => userArr);
        });
      });
  }, []);
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
                  {users &&
                    users.map((each, index) => {
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
