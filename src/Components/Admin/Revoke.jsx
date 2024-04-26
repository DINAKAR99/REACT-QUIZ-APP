import React, { useEffect, useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Col, Container, Nav, NavItem, NavLink, Row } from "reactstrap";
import CustomNavbar from "../CustomNavbar";
import toast from "react-hot-toast";
const Revoke = () => {
  document.title = "quiz unlock";
  const [categories, setCategories] = useState([]);
  const [currentcat, setCurrentcat] = useState([]);
  const [users, setUsers] = useState([]);
  const [eligibleUsers, setEligibleUsers] = useState([""]);

  $(document).ready(function () {
    $("#selectAll").click(function () {
      if (this.checked) {
        $(".user").each(function () {
          this.checked = true;
        });
      } else {
        $(".user").each(function () {
          this.checked = false;
        });
      }
    });

    $(".user").click(function () {
      if ($(".user:checked").length == $(".user").length) {
        $("#selectAll").prop("checked", true);
      } else {
        $("#selectAll").prop("checked", false);
      }
    });
  });
  const handleSubmit = (event) => {
    event.preventDefault();

    //fetch all sleected checkboxes
    const checkedCheckboxes = $(".user:checked");
    const checkedValues = Array.from(checkedCheckboxes).map(
      (checkbox) => checkbox.value
    );
    console.log(checkedValues);
    console.log("selected category ", currentcat);

    // load up into db the user eligible for the quiz
    //revoke quiz for user meaning clear the quiz data of particular category for user
    //make a array for all promise to do promis.all
    let allPromise = [];
    checkedValues.forEach((eachUser) => {});
  };
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

  useEffect(() => {
    axios
      .get(
        "https://react-quiz-app-001-default-rtdb.asia-southeast1.firebasedatabase.app/questions.json"
      )
      .then((response) => {
        console.log(Object.keys(response.data));
        setCategories((e) => Object.keys(response.data));
      });

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

  const fecthUnlockedUsers = (category) => {
    setEligibleUsers((e) => []);

    axios
      .get(
        `https://react-quiz-app-001-default-rtdb.asia-southeast1.firebasedatabase.app/questions/${category}/unlocked.json`
      )
      .then((res) => {
        console.log(res.data);
        if (res.data != null) {
          setEligibleUsers((e) => res.data);
        } else {
          console.log("no data");
        }
      });
  };
  return (
    <div>
      <CustomNavbar />
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
                    className=" border-bottom border-white border-opacity-50 custom  "
                    href="/admin/dashboard"
                  >
                    Admin Dashboard
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className=" border-top   border-bottom border-opacity-50      border-white custom  "
                    href="/admin/dashboard"
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
                    unlock quiz
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
          </Col>
          <Col>
            <Container>
              <Row>
                <Col md={6} className="p-2  ">
                  <form onSubmit={handleSubmit}>
                    <div className="border border-3  border-black   m-3 rounded p-4 bg-info-subtle        ">
                      <h3 className="mt-3 text-center  ">
                        <b>&nbsp; Revoke Quiz </b>
                      </h3>
                      <select
                        name="categories "
                        onChange={(e) => {
                          setCurrentcat(e.target.value);
                          fecthUnlockedUsers(e.target.value);
                        }}
                        className="form-select w-50 mx-auto "
                        id="cat"
                        required
                      >
                        <option value="" selected disabled>
                          --select--
                        </option>
                        {categories.map((e) => (
                          <option value={e}>{e}</option>
                        ))}
                      </select>
                      <h5 className="mt-4  ms-3    ">
                        Revoke <b>{currentcat} quiz</b> for below users
                      </h5>
                      <div className="p-3  checkers">
                        <input
                          type="checkbox"
                          name="all"
                          value="all"
                          id="selectAll"
                          className="form-check-input mb-3 me-2 border border-1   border-black     "
                        />
                        Select All
                        {users &&
                          users.map((each, index) => {
                            console.log(eligibleUsers);

                            // );
                            return (
                              <>
                                <div>
                                  <input
                                    type="checkbox"
                                    name="all"
                                    value={each.name}
                                    id={`user-${index}`}
                                    className="form-check-input user me-2 border border-1   border-black "
                                    checked={
                                      eligibleUsers?.includes(each.name)
                                        ? true
                                        : false
                                    }
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setEligibleUsers((prevState) => [
                                          ...prevState,
                                          each.name,
                                        ]);
                                      } else {
                                        setEligibleUsers((prevState) =>
                                          prevState.filter(
                                            (user) => user !== each.name
                                          )
                                        );
                                      }
                                    }}
                                  />
                                  <label htmlFor="all">{each.name}</label>
                                </div>
                              </>
                            );
                          })}
                      </div>

                      <div>
                        <button
                          type="submit"
                          className="btn  btn-secondary ms-3 "
                          style={{ backgroundColor: "#538cc6" }}
                        >
                          save
                        </button>
                      </div>
                    </div>
                  </form>
                </Col>

                {currentcat.length > 0 && (
                  <Col md={6} className="p-2  ">
                    <div className="border border-3  border-black m-3    rounded-2 rounded    m-3  ">
                      <h6 className="    ">
                        <h5 className="text-center w-100 mx-auto mt-3     ">
                          User Quiz Lock Status
                        </h5>
                        <table className="table-bordered border border-3  table-striped   table ">
                          <thead>
                            <tr>
                              <th style={{ width: "10%" }}>index</th>
                              <th style={{ minWidth: "45%" }}>unlocked for </th>
                              <th style={{ minWidth: "45%" }}>locked for </th>
                            </tr>
                          </thead>
                          <tbody>
                            {users &&
                              users.map((each, index) => {
                                return (
                                  <tr>
                                    {eligibleUsers?.includes(each.name) ? (
                                      <>
                                        <td>{index}</td>
                                        <td>{each.name}</td>
                                        <td></td>
                                      </>
                                    ) : (
                                      <>
                                        <td>{index}</td>
                                        <td></td>
                                        <td>{each.name}</td>
                                      </>
                                    )}
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                      </h6>
                    </div>
                  </Col>
                )}
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Revoke;
