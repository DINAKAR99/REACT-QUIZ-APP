import React, { useEffect } from "react";
import * as yup from "Yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ErrorMessage, Field, Form, Formik } from "formik";
import toast from "react-hot-toast";
import { Label } from "reactstrap";
import CustomNavbar from "../Components/CustomNavbar";
import { auth } from "./../firebase";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const initialValues = {
    email: "",
    password: "",
  };
  const validate = yup.object({
    email: yup.string().required("Email is required!"),
    password: yup.string().required("Password is required!!"),
  });

  useEffect(() => {
    if (
      sessionStorage.getItem("usermail") &&
      sessionStorage.getItem("secretkey")
    ) {
      window.location.href = "/admin/dashboard";
    } else if (sessionStorage.getItem("usermail")) {
      window.location.href = "/user/userDashboard";
    }
  });
  document.title = "Login";
  const navigate = useNavigate();
  const submitForm = (values) => {
    // e.preventDefault();
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        // Signed in

        const user = userCredential.user;
        toast.success("Login successful");

        console.log(user);

        sessionStorage.setItem("usermail", user.email);
        const username = user.email.split("@")[0];
        const emailWithDash = user.email.replace(/\./g, "-");
        sessionStorage.setItem("modedmail", emailWithDash);

        axios
          .get(
            `https://react-quiz-app-001-default-rtdb.asia-southeast1.firebasedatabase.app/users/${username}.json`
          )
          .then((res) => {
            setTimeout(() => {
              console.log(res.data.secretkey);

              if (res.data.secretkey == "maximusdecimus") {
                navigate("/admin/dashboard");
              } else {
                navigate("/user/userDashboard");
              }
            }, 1000);
            if (res.data.secretkey != null) {
              sessionStorage.setItem("admin", true);
              console.log("the key is :....");
            }
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
        // toast.error("incorrect name or password", { duration: 1000 });
      });
  };

  return (
    <div className="bg-black vh-100   ">
      <CustomNavbar />
      <div className=" container-fluid   d-flex justify-content-center    py-5  loginpageContainer   ">
        <div className="  d-flex white-shadow    ">
          <div className="form-container col-md-6 text-white  border-end   p-3 sign-in-container ">
            <h1 className="text-center">Sign in</h1>
            <div className="social-container text-center p-2">
              <a href="#" className="social mx-2 p-2     ">
                <i className="fa fa-facebook-f text-white  " />
              </a>
              <a href="#" className="social mx-2 p-2   text-white">
                <i className="fa-brands fa-google"></i>
              </a>
              <a href="#" className="social mx-2 p-2   text-white">
                <i className="fa fa-linkedin" />
              </a>
            </div>
            <div className="d-flex justify-content-center ">
              <span className="form-text text-white   ">
                or use your account
              </span>
            </div>
            <Formik
              initialValues={initialValues}
              validationSchema={validate}
              onSubmit={(val) => submitForm(val)}
            >
              {(formik) => (
                <div>
                  <Form className="form p-3" style={{ fontSize: "13px" }}>
                    <div className="form-group mt-1 mb-3  ">
                      <Label htmlFor="email" className="form-label">
                        Email
                      </Label>
                      <Field
                        type="email"
                        name="email"
                        label="Email"
                        style={{ color: "white", fontSize: "13px" }}
                        placeholder="example@gmail.com"
                        className={`form-control   rounded-0 bg-transparent border-0 border-bottom    ${
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
                    <div className="form-group mt-1 text-white ">
                      <Label
                        htmlFor="password"
                        className="form-label text-white "
                      >
                        Password
                      </Label>
                      <Field
                        type="password"
                        style={{ color: "white", fontSize: "13px" }}
                        name="password"
                        label="Password"
                        placeholder="qwert@123"
                        className={`form-control bg-transparent border-0 border-bottom   rounded-0 ${
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
                    <div className="container text-center">
                      <button
                        className="btn btn-outline-light background-primary rounded-pill  m-3 mt-4  px-3   "
                        type="submit"
                      >
                        Sign In
                      </button>
                    </div>
                  </Form>
                </div>
              )}
            </Formik>
          </div>

          <div className="signinBack d-flex  align-items-center justify-content-center    col-md-6 ">
            <div className="info  h-100 text-white text-center p-5    ">
              <div className="mt-5">
                <h1>Get Started!!</h1>
                <p>New User ?</p>
                <a
                  href="/signup"
                  className="btn btn-outline-light rounded-pill"
                >
                  Register
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
