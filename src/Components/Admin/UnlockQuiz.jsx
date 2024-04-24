import React, { useEffect, useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";

import CustomNavbar from "../CustomNavbar";
import Sidebar from "./Sidebar";
import { AwesomeButton } from "react-awesome-button";

const UnlockQuiz = () => {
  const [categories, setCategories] = useState([]);
  const [currentcat, setCurrentcat] = useState([]);
  const [users, setUsers] = useState([]);
  const [eligibleUsers, setEligibleUsers] = useState(["xcd"]);

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
    axios.put(
      `https://react-quiz-app-001-default-rtdb.asia-southeast1.firebasedatabase.app/questions/${currentcat}/unlocked.json`,
      checkedValues
    );
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
                  <form onSubmit={handleSubmit}>
                    <div className="border border-3 vh-100  m-3  ">
                      <h3 className="mt-3 ">
                        <b>&nbsp; Unlock Quiz </b>
                      </h3>
                      <select
                        name="categories "
                        onChange={(e) => {
                          setCurrentcat(e.target.value);
                          fecthUnlockedUsers(e.target.value);
                        }}
                        className="form-select"
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
                        Unlock <b>{currentcat} quiz</b> for below users
                      </h5>
                      <div className="p-3  checkers">
                        <input
                          type="checkbox"
                          name="all"
                          value="all"
                          id="selectAll"
                          className="form-check-input mb-3 me-2  "
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
                                    className="form-check-input user me-2"
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
                        <button type="submit">save</button>
                      </div>
                    </div>
                  </form>
                </Col>
                <Col md={6}>
                  <div className="border border-3 vh-100  m-3  ">
                    <h3 className="mt-3 ">
                      <b>&nbsp; -- --</b>{" "}
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

export default UnlockQuiz;
