import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "Yup";

import { useNavigate } from "react-router-dom";

import { auth } from "../firebase";
import HomeNavbar from "../Components/HomeNavbar";

const Login = ({ flip }) => {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    console.log({ flip });
    setIsFlipped(flip);
  }, [flip]);
  const loginSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, "Password is very Short! minimum 7 characters")
      .max(50, "Password is very Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
  });
  const handleEditClick = () => {
    setIsFlipped((flip) => !flip);
    console.log(isFlipped);
  };

  const handleLogin = (values) => {
    // e.preventDefault();
    toast.loading("Logging in...");
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setTimeout(() => {
          // toast.remove();
          // toast.success("Login successful");
          // navigate("/log");
        }, 1500);
        console.log(user.email);

        sessionStorage.setItem("usermail", user.email);
        const emailWithDash = user.email.replace(/\./g, "-");
        sessionStorage.setItem("modedmail", emailWithDash);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };
  const handleSignup = (values) => {
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        toast.success("Account created successfully");
        console.log(user);
        navigate("/login");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
        console.log(errorCode, errorMessage);

        // ..
      });
  };
  // const handleSubmit = (values, { setSubmitting }) => {
  //   setTimeout(() => {
  //     console.log(values.email);
  //     alert(JSON.stringify(values, null, 2));
  //   }, 400);
  // };
  return (
    <>
      <HomeNavbar />
      <>
        <main
          class="primary-background banner-background d-flex align-items-center vh-100  "
          style={{ marginTop: "0px" }}
        >
          <div class="container-fluid  ">
            <div class="row">
              <div class="col-md-4 offset-md-4 drop-from-bottom">
                <div className="d-flex justify-content-center mt-5 mb-5    ">
                  <div className={`flip-card ${isFlipped ? "flipped" : ""}`}>
                    <div className="flip-card-inner rounded rounded-4">
                      <div
                        className="flip-card-front shadow-lg challcont share"
                        style={{
                          backgroundColor: "transparent",
                          backdropFilter: "blur(4px)",
                        }}
                      >
                        <div
                          class="card c1 bg-transparent text-white shadow border-0  "
                          style={{
                            backgroundColor: "transparent",
                            backdropFilter: "blur(4px)",
                          }}
                        >
                          <div class="card-header text-center p-0 ">
                            <div class="card-body" style={{ border: "none" }}>
                              <h3>Login &nbsp;</h3>
                              <span class="fa fa-user-plus fa-3x mb-3 mt-1 "></span>

                              {/* <button onClick={handleEditClick}>signup</button> */}
                              <Formik
                                initialValues={{ email: "", password: "" }}
                                validationSchema={loginSchema}
                                onSubmit={handleLogin}
                              >
                                {({ isSubmitting }) => {
                                  return (
                                    <Form>
                                      <div class="form-group ">
                                        <label className="float-start mb-1   ">
                                          Email
                                        </label>{" "}
                                        <Field
                                          type="email"
                                          name="email"
                                          class="form-control"
                                          placeholder="Enter email"
                                          // onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <ErrorMessage
                                          name="email"
                                          component="p"
                                        />
                                      </div>
                                      <div class="form-group pb-4 mt-3 ">
                                        <label className="float-start  mb-1    ">
                                          Password
                                        </label>
                                        <Field
                                          type="password"
                                          name="password"
                                          class="form-control"
                                          placeholder="enter password"
                                        />
                                        <ErrorMessage
                                          name="password"
                                          component="div"
                                        />
                                      </div>
                                      <button
                                        type="submit"
                                        className="mt-2  px-4 "
                                        style={{ backgroundColor: "#2c3e50" }}
                                      >
                                        Login
                                      </button>
                                    </Form>
                                  );
                                }}
                              </Formik>
                              <div className="mt-3">
                                <p className="text-white-50  ">
                                  Dont have an Account ?{" "}
                                  <a
                                    href="#"
                                    onClick={handleEditClick}
                                    className="text-white"
                                  >
                                    Signup
                                  </a>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="flip-card-back shadow-lg challcont     share"
                        style={{
                          backgroundColor: "transparent",
                          backdropFilter: "blur(4px)",
                        }}
                      >
                        <div class="card c1 bg-transparent text-white shadow  border-0  ">
                          <div
                            class="card-header text-center p-0 "
                            style={{ border: "none" }}
                          >
                            <div class="card-body">
                              <h3>SignUps &nbsp;</h3>
                              <span class="fa fa-user-plus fa-3x mb-3 mt-1 "></span>

                              {/* <button onClick={handleEditClick}>login</button> */}
                              <Formik
                                initialValues={{ email: "", password: "" }}
                                validationSchema={loginSchema}
                                onSubmit={handleSignup}
                              >
                                {({ isSubmitting }) => {
                                  return (
                                    <Form>
                                      <div class="form-group ">
                                        <label className="float-start mb-1   ">
                                          Email
                                        </label>{" "}
                                        <Field
                                          type="email"
                                          name="email"
                                          class="form-control"
                                          placeholder="Enter email"
                                          // onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <ErrorMessage
                                          name="email"
                                          component="div"
                                        />
                                      </div>
                                      <div class="form-group pb-4 mt-3 ">
                                        <label className="float-start  mb-1    ">
                                          Password
                                        </label>
                                        <Field
                                          type="password"
                                          name="password"
                                          class="form-control"
                                          placeholder="enter password"
                                        />
                                        <ErrorMessage
                                          name="password"
                                          component="div"
                                        />
                                      </div>
                                      <div class="form-group pb-4 mt-3 ">
                                        <label className="float-start  mb-1    ">
                                          Password
                                        </label>
                                        <Field
                                          type="password"
                                          name="password"
                                          class="form-control"
                                          placeholder="enter password"
                                        />
                                        <ErrorMessage
                                          name="password"
                                          component="div"
                                        />
                                      </div>
                                      <div class="form-group pb-4 mt-3 ">
                                        <label className="float-start  mb-1    ">
                                          Password
                                        </label>
                                        <Field
                                          type="password"
                                          name="password"
                                          class="form-control"
                                          placeholder="enter password"
                                        />
                                        <ErrorMessage
                                          name="password"
                                          component="div"
                                        />
                                      </div>
                                      <div class="form-group pb-4 mt-3 ">
                                        <label className="float-start  mb-1    ">
                                          Password
                                        </label>
                                        <Field
                                          type="password"
                                          name="password"
                                          class="form-control"
                                          placeholder="enter password"
                                        />
                                        <ErrorMessage
                                          name="password"
                                          component="div"
                                        />
                                      </div>
                                      <button
                                        type="submit"
                                        className="mt-2 px-4 "
                                        style={{ backgroundColor: "#2c3e50" }}
                                      >
                                        Singup
                                      </button>
                                    </Form>
                                  );
                                }}
                              </Formik>
                              <div className="mt-3">
                                <p className="text-white-50  ">
                                  Already have an Account ?{" "}
                                  <a
                                    href="#"
                                    onClick={handleEditClick}
                                    className="text-white"
                                  >
                                    Login
                                  </a>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </>

      <></>
    </>
  );
};

export default Login;
