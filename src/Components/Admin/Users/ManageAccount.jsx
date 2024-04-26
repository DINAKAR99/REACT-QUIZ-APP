import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import * as yup from "Yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import aron from "../../pictures/aron.jpg";
import { Button, Col, Container, Label, Row } from "reactstrap";
import CustomNavbar from "../../CustomNavbar";

const ManageAccount = () => {
  const validate = yup.object({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Email is invalid").required("Email is required"),
    empId: yup.string().required("Employee id is required"),
    password: yup
      .string()
      .min(4, "Password must be minimum 4 digits!")
      .required("Password Required!"),
    conPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Password must match!")
      .required("Confirm password is reqired!"),
  });
  document.title = "Manage Account";
  const [user, setUser] = useState("");
  useEffect(() => {
    //fecth user from local storage and set to inital values
    const usermail = sessionStorage.getItem("usermail");
    setUser((e) => usermail);
  });

  const text = " Welcome  ".split(" ");
  const initialValues = {
    userName: "dinakar",
    email: sessionStorage.getItem("usermail"),
    empId: "2397",
    password: "add",
    conPassword: "add",
  };
  return (
    <div>
      <CustomNavbar />

      <Container>
        <Row>
          <Col className="sidebar">
            <div className="text-center d-flex justify-content-center mt-5     ">
              <img
                src={aron}
                alt=""
                height={120}
                width={120}
                style={{
                  borderRadius: "50%",
                  boxShadow: "0px 0px 10px black",
                  objectFit: "cover",
                }}
              ></img>
              <div>
                <i
                  className="fas fa-pencil-alt        "
                  style={{ fontSize: 20, marginTop: 100 }}
                ></i>
              </div>
            </div>
            <div
              className="  d-flex flex-column      mt-3 "
              style={{ fontSize: 99 }}
            >
              <h3>
                {/* Welcome, <b className="text-uppercase  ">karengula dinakar</b> */}
              </h3>

              <div style={{ fontSize: "99px" }}>
                <h3>{text}</h3>
              </div>

              <div>
                <h1 className="text-uppercase  ">{user}</h1>
              </div>
            </div>
          </Col>
          <Col md={{ size: 6 }} className="mt-4     ">
            <h5 className="text-center    ">Edit your details</h5>
            <div className="border rounded p-3 shadow-lg   ">
              <Formik
                initialValues={initialValues}
                validationSchema={validate}
                onSubmit={(values) => {
                  console.log("submitted");
                  console.log(values);
                }}
              >
                {(formik) => (
                  <div>
                    <Form
                      className="form p-3 pb-1 "
                      style={{ fontSize: "13px" }}
                    >
                      <div className="form-group  ">
                        <Label htmlFor="name" className="form-label ">
                          Name
                        </Label>
                        <Field
                          type="text"
                          label="Name"
                          name="userName"
                          style={{ fontSize: "13px" }}
                          placeholder="Enter your name"
                          className={`form-control rounded-0 border-0 border-bottom     ${
                            formik.touched.name &&
                            formik.errors.name &&
                            "is-invalid"
                          }`}
                          id="name"
                        />

                        <ErrorMessage
                          component="div"
                          name="name"
                          className="text-danger"
                        />
                      </div>
                      <div className="form-group mt-1 ">
                        <Label htmlFor="email" className="form-label ">
                          Email
                        </Label>
                        <Field
                          type="email"
                          name="email"
                          label="Email"
                          style={{ fontSize: "13px" }}
                          placeholder="example@gmail.com"
                          className={`form-control rounded-0   border-0 border-bottom  accordion  ${
                            formik.touched.email &&
                            formik.errors.email &&
                            "is-invalid"
                          }`}
                          id="email"
                        />

                        <ErrorMessage
                          component="div"
                          name="email"
                          className="text-danger"
                        />
                      </div>
                      <div className="form-group mt-1 ">
                        <Label htmlFor="empId" className="form-label ">
                          Employee Id
                        </Label>
                        <Field
                          type="text"
                          name="empId"
                          label="Employee Id"
                          style={{ fontSize: "13px" }}
                          placeholder="Enter Your Id"
                          className={`form-control rounded-0    border-0 border-bottom  ${
                            formik.touched.empId &&
                            formik.errors.empId &&
                            "is-invalid"
                          }`}
                          id="empId"
                        />

                        <ErrorMessage
                          component="div"
                          name="empId"
                          className="text-danger"
                        />
                      </div>
                      <div className="form-group mt-1 ">
                        <Label htmlFor="password" className="form-label ">
                          Password
                        </Label>
                        <Field
                          type="password"
                          name="password"
                          style={{ fontSize: "13px" }}
                          label="Password"
                          placeholder="qwert@123"
                          className={`form-control rounded-0  border-0 border-bottom  ${
                            formik.touched.password &&
                            formik.errors.password &&
                            "is-invalid"
                          }`}
                          id="password"
                        />

                        <ErrorMessage
                          component="div"
                          name="password"
                          className="text-danger"
                        />
                      </div>
                      <div className="mb-2 mt-1   ">
                        <label htmlFor="confirmPassword" className="">
                          Confirm Password
                        </label>
                        <input
                          id="confirmPassword"
                          style={{ fontSize: "13px" }}
                          className={`form-control shadow-none   rounded-0 border-0 border-bottom   mt-1 ${
                            formik.touched.conPassword &&
                            formik.errors.conPassword &&
                            "is-invalid"
                          }`}
                          type="password"
                          name="conPassword"
                          placeholder="confirm password..."
                          {...formik.getFieldProps("conPassword")}
                        />
                        <ErrorMessage
                          component="div"
                          name="conPassword"
                          className="text-danger"
                        />
                      </div>
                      <div className="container text-center">
                        <Button
                          className="btn   me-2  mt-4  px-3  "
                          type="submit"
                        >
                          Edit
                        </Button>
                        <Button className="btn   mt-4  px-3  " type="reset">
                          Reset
                        </Button>
                      </div>
                    </Form>
                  </div>
                )}
              </Formik>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ManageAccount;
