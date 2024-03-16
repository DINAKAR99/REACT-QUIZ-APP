import React, { useState } from "react";

import * as yup from "Yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { InputGroup, InputGroupText, Label } from "reactstrap";
import CustomNavbar from "../Components/CustomNavbar";
import { userRegister } from "../Components/Helper/QuizHelper";
import toast from "react-hot-toast";

const SignupPage = () => {
  // const [showpassword, setShowpassword] = useState(false);

  const navigate = useNavigate();
  const initialValues = {
    userName: "",
    email: "",
    empId: "",
    password: "",
    conPassword: "",
  };
  const validate = yup.object({
    userName: yup.string().required("Name is required"),
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

  const submitHandler = (values) => {
    console.log("submitted");
    console.log(values);

    let senderPacket = values;
    delete senderPacket.conPassword;

    console.log(senderPacket);

    userRegister(senderPacket)
      .then((response) => {
        toast.success("signup successful");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      })
      .catch((err) => {
        toast.error("signup unsuccessful");
        setTimeout(() => {
          // window.location.reload();
        }, 1000);
      });
  };

  const passwordToggler = () => {
    setShowpassword((showpassword) => !showpassword);
  };

  return (
    <div className="bg-black vh-100 ">
      <CustomNavbar />

      <div
        className="container-fluid  bg-black d-flex justify-content-center m-0  p-5    
       "
      >
        <div className="signinBack d-flex  align-items-center justify-content-center col-md-4 white-shadow  ">
          <div className="info   bg-transparent   text-white text-center p-5 pb-0  ">
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
            onSubmit={submitHandler}
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
                      name="userName"
                      style={{ fontSize: "13px" }}
                      placeholder="Enter your name"
                      className={`form-control rounded-0 text-white   bg-transparent  border-0 border-bottom border-white    ${
                        formik.touched.userName &&
                        formik.errors.userName &&
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
                      className={`form-control rounded-0 text-white bg-transparent border-0 border-bottom border-white ${
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
                      className={`form-control rounded-0 text-white bg-transparent  border-0 border-bottom border-white ${
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
                      className={`form-control rounded-0 bg-transparent border-0 text-white  border-bottom border-white ${
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

                    {/* <InputGroup> */}
                    <input
                      id="confirmPassword"
                      style={{ fontSize: "13px" }}
                      className={`form-control shadow-none  text-white  bg-transparent rounded-0 border-0 border-bottom border-white mt-1 ${
                        formik.touched.conPassword &&
                        formik.errors.conPassword &&
                        "is-invalid"
                      }`}
                      // type={showpassword ? "text" : "password"}
                      type="password"
                      name="conPassword"
                      placeholder="confirm password..."
                      value={formik.values.conPassword} // Ensure the value is controlled
                      onChange={formik.handleChange} // Handle change event
                      {...formik.getFieldProps("conPassword")}
                    />
                    {/* <InputGroupText className="bg-black border-0 rounded-0 border-bottom  "> */}
                    {/* <i
                      class={
                        showpassword
                          ? " fa-solid fa-eye-slash text-white "
                          : "fa-regular fa-eye text-white "
                      }
                      onClick={passwordToggler}
                    ></i> */}
                    {/* </InputGroupText> */}
                    {/* </InputGroup> */}

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
    </div>
  );
};

export default SignupPage;
