import React, { useState } from "react";

import { Input, Button, Label, Container, Row, Col } from "reactstrap";
import quiz from "../Components/pictures/BRAINBYTES.gif";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "Yup";
import CustomNavbar from "../Components/CustomNavbar";
import { Link } from "react-router-dom";

const SignupPage = () => {
  const initialValues = {
    name: "",
    email: "",
    empId: "",
    password: "",
    conPassword: "",
  };
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
  return (
    <div className="bg-black  ">
      <CustomNavbar />
      <div
        className="container-fluid mx-3   d-flex justify-content-center   p-5    
       "
      >
        <div className="signinBack d-flex  align-items-center justify-content-center   col-md-4 white-shadow  ">
          <div className="info h-100   bg-transparent   text-white text-center p-5 pb-0  ">
            <h1 className="p-5 mt-5">Resume your journey!!</h1>
            <p></p>

            <Link to={"/login"}>
              <button
                className="btn btn-outline-light   rounded-pill      px-4  "
                type="submit"
              >
                Login
              </button>
            </Link>
          </div>
        </div>

        <div className="form-container bg-black    col-md-4   border-0 border-start    p-5 pb-0   sign-in-container white-shadow ">
          <h1 className="text-center text-white   ">Sign Up</h1>
          <div className="social-container text-center p-2">
            <a href="#" className="social mx-2 p-2     ">
              <i className="fa fa-facebook-f text-white  " />
            </a>
            <a href="#" className="social mx-2 p-2   text-white">
              <i class="fa-brands fa-google"></i>
            </a>
            <a href="#" className="social mx-2 p-2   text-white">
              <i className="fa fa-linkedin" />
            </a>
          </div>

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
                <Form className="form p-3" style={{ fontSize: "13px" }}>
                  <div className="form-group  ">
                    <Label
                      htmlFor="name"
                      className="form-label text-white      "
                    >
                      Name
                    </Label>
                    <Field
                      type="text"
                      label="Name"
                      name="name"
                      style={{ fontSize: "13px" }}
                      placeholder="Enter your name"
                      className={`form-control rounded-0    bg-transparent  border-0 border-bottom border-white    ${
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
                    <Label htmlFor="email" className="form-label text-white ">
                      Email
                    </Label>
                    <Field
                      type="email"
                      name="email"
                      label="Email"
                      style={{ fontSize: "13px" }}
                      placeholder="example@gmail.com"
                      className={`form-control rounded-0 bg-transparent border-0 border-bottom border-white ${
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
                    <Label htmlFor="empId" className="form-label text-white ">
                      Employee Id
                    </Label>
                    <Field
                      type="text"
                      name="empId"
                      label="Employee Id"
                      style={{ fontSize: "13px" }}
                      placeholder="Enter Your Id"
                      className={`form-control rounded-0  bg-transparent  border-0 border-bottom border-white ${
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
                    <Label
                      htmlFor="password"
                      className="form-label text-white "
                    >
                      Password
                    </Label>
                    <Field
                      type="password"
                      name="password"
                      style={{ fontSize: "13px" }}
                      label="Password"
                      placeholder="qwert@123"
                      className={`form-control rounded-0 bg-transparent border-0 border-bottom border-white ${
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
                    <label htmlFor="confirmPassword" className="text-white ">
                      Confirm Password
                    </label>
                    <input
                      id="confirmPassword"
                      style={{ fontSize: "13px" }}
                      className={`form-control shadow-none bg-transparent rounded-0 border-0 border-bottom border-white mt-1 ${
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
                    <button
                      className="btn btn-outline-light   rounded-pill m-3 mt-4  px-3  "
                      type="submit"
                    >
                      Sign Up
                    </button>
                    <button
                      className="btn btn-outline-light   rounded-pill m-3 mt-4  px-3  "
                      type="reset"
                    >
                      Reset
                    </button>
                  </div>
                </Form>
              </div>
            )}
          </Formik>
        </div>
      </div>
      {/* <Container>
        <Row>
          <Col></Col>
        </Row>
      </Container> */}
    </div>
  );
};

export default SignupPage;
