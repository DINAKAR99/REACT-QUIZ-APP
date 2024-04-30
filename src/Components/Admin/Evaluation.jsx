import React, { useEffect, useState } from "react";

import { AwesomeButton } from "react-awesome-button";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";

import CustomNavbar from "../CustomNavbar";
import Sidebar from "./Sidebar";
import toast from "react-hot-toast";
import ScrollToTop from "react-scroll-to-top";

const Evaluation = () => {
  document.title = "Evaluation";
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [evaluationData, setEvaluationData] = useState({});
  useEffect(() => {
    axios
      .get(
        "https://react-quiz-app-001-default-rtdb.asia-southeast1.firebasedatabase.app/questions.json"
      )
      .then((res) => {
        console.log(Object.keys(res.data));
        setCategories((e) => Object.keys(res.data));
      });
  }, []);
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
  const navigate = useNavigate();
  const evaluate = (code) => {
    console.log(code);

    toast.loading("loading...");
    axios
      .put(
        `https://react-quiz-app-001-default-rtdb.asia-southeast1.firebasedatabase.app/exam/${currentCategory}/attempted/${currentUser}/evalution.json`,
        {
          quizResult: code,
          status: code,
        }
      )
      .then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 1500);
        setTimeout(() => {
          toast.remove();
          toast.success("Successfully evaluated");
        }, 1000);
      });
    //now for settting user attempted meta data
    const myPromise = axios.put(
      `https://react-quiz-app-001-default-rtdb.asia-southeast1.firebasedatabase.app/users/${currentUser}/attempted/${currentCategory}.json`,
      {
        Resultstatus: code,
        status: code,
      }
    );
  };

  const fetchEvaluationData = (category) => {
    axios
      .get(
        `https://react-quiz-app-001-default-rtdb.asia-southeast1.firebasedatabase.app/exam/${category}/attempted.json`
      )
      .then((data) => {
        console.log(data.data);

        setEvaluationData((e) => data.data);
      });
  };
  const showUserExamSheet = () => {
    // navigate("/admin/userquiz", {
    //   state: {
    //     categoryName: currentCategory,
    //     user: { cii: 23, name: currentUser },
    //   },
    // });
    const url = `/admin/userquiz`;
    window.localStorage.setItem("EvalCategory", currentCategory);
    window.localStorage.setItem(
      "EvalUser",
      JSON.stringify({ cii: 23, name: currentUser })
    );
    window.open(url, "_blank");
  };
  return (
    <div>
      <CustomNavbar />
      <Container fluid className="sidebar cont">
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
                <Col
                  md={6}
                  className="border border-2 rounded rounded-3 mb-5   border-black  mt-3    vh-100   "
                >
                  <div>
                    <h3 className="mt-3 ">
                      <b>&nbsp; Evaluation Dashboard</b>
                      <hr />
                    </h3>
                  </div>

                  <h5>choose Quiz category </h5>
                  <select
                    name="quizcategory "
                    className="form-select mb-4  "
                    onChange={(e) => {
                      setCurrentCategory(e.target.value);
                      fetchEvaluationData(e.target.value);
                      setCurrentUser((e) => "");
                      console.log(e.target.value);
                    }}
                  >
                    <option defaultValue="" selected disabled>
                      --select--
                    </option>

                    {categories &&
                      categories.map((each, index) => {
                        return (
                          <option key={each} value={each}>
                            {each}
                          </option>
                        );
                      })}
                  </select>
                  {evaluationData ? (
                    <>
                      <h5>quiz attempted by users :</h5>
                      <hr />
                      <i>
                        <h6>select a user to evaluate</h6>
                      </i>
                      <select
                        name="quizcategory "
                        className="form-select mb-4 "
                        value={currentUser}
                        onChange={(e) => {
                          setCurrentUser(e.target.value);

                          console.log(e.target.value);
                        }}
                      >
                        <option value="" selected disabled>
                          --select--
                        </option>
                        {evaluationData &&
                          Object.keys(evaluationData).map((each, index) => {
                            console.log(evaluationData[each].evalution.status);
                            return (
                              <option key={index} value={each}>
                                {each}
                              </option>
                            );
                          })}
                      </select>

                      <hr />

                      {currentUser != "" && (
                        <div className="text-center  ">
                          <h5>User : {currentUser}</h5>
                          <button
                            className="btn border border-black    "
                            style={{ backgroundColor: "#ddcc67" }}
                            onClick={(e) => showUserExamSheet()}
                          >
                            View Answer Sheet <quiz></quiz>
                          </button>

                          <div className="d-flex mt-3 gap-2 justify-content-center    ">
                            <button
                              className="btn btn-success "
                              onClick={(e) => evaluate("passed")}
                            >
                              Pass
                            </button>
                            <button
                              className="btn btn-danger "
                              onClick={(e) => evaluate("failed")}
                            >
                              Fail
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <h5>No Data Found</h5>
                      <hr />
                    </>
                  )}
                </Col>
                <Col md={6}>
                  <div>
                    <h3 className="mt-3 ">Evaluation Report</h3>
                  </div>
                  <table className="table border border-2 border-black ">
                    <thead>
                      <tr className="fw-bold  ">
                        <th className="fw-bold  ">#</th>
                        <th className="fw-bold  ">User</th>
                        <th className="fw-bold  ">Evaluation Status</th>
                        <th className="fw-bold  ">Result</th>
                      </tr>
                    </thead>
                    <tbody>
                      {evaluationData &&
                        Object.keys(evaluationData).map((each, index) => {
                          console.log(evaluationData[each].evalution.status);
                          return (
                            <>
                              <tr>
                                <th scope="row">{index}</th>
                                <td>{each}</td>
                                <td>{evaluationData[each].evalution.status}</td>
                                <td>
                                  {evaluationData[each].evalution.quizResult}
                                </td>
                              </tr>
                            </>
                          );
                        })}
                    </tbody>
                  </table>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
      <ScrollToTop smooth height="15" width="15" />
    </div>
  );
};

export default Evaluation;
