import * as yup from "Yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Col,
  Container,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import CustomNavbar from "../../CustomNavbar";
import aron from "../../pictures/dummy.png";
import toast from "react-hot-toast";
import axios from "axios";
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
  const [second, setSecond] = useState(false);
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const handleSubmit = () => {};
  const fileInputRef = useRef();
  useEffect(() => {
    //fecth user from local storage and set to inital values
    const usermail = sessionStorage.getItem("usermail");
    setUser((e) => usermail);
    const username = usermail.split("@")[0];

    //first fecth if user is having  profile picture or not
    axios
      .get(
        `https://react-quiz-app-001-default-rtdb.asia-southeast1.firebasedatabase.app/users/${username}/imagegurl.json`
      )
      .then((response) => {
        if (response.data == null) {
          console.log("yeh no image   ");
          console.log(response.data);
        } else {
          console.log(response.data.url);
          setImageUrl((e) => response.data.url);
        }
      });
  });
  const submitImage = () => {
    const username = user.split("@")[0];
    console.log("ddedd");
    toast.loading("uploading");

    setTimeout(() => {}, 2000);

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "quizapp");
    data.append("cloud_name", "diivbs6se");

    let url = `https://api.cloudinary.com/v1_1/diivbs6se/image/upload`;

    axios
      .post(url, data)
      .then((res) => {
        console.log(res.data.url);
        toast.remove();
        toast.success("Image uploaded successfully");
        //now we need to store the image url in user specifuc node
        axios
          .put(
            `https://react-quiz-app-001-default-rtdb.asia-southeast1.firebasedatabase.app/users/${username}/imagegurl.json`,
            {
              url: res.data.url,
            }
          )
          .then((res) => {
            console.log(res);
          });
      })
      .catch((err) => {
        toast.remove();
        toast.error("Image upload failed!");
      });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      const previewImage = document.getElementById("previewImage");
      previewImage.src = e.target.result;
      previewImage.style.display = "block";
    };

    reader.readAsDataURL(file);
  };
  const toggle = () => {
    setModal(!modal);
    console.log("fsff");
  };
  const [modal, setModal] = useState(false);
  const text = " Welcome  ".split(" ");
  const initialValues = {
    userName: "dinakar",
    email: sessionStorage.getItem("usermail"),
    empId: "2397",
    password: "add",
    conPassword: "add",
  };

  const removeImage = () => {
    const userConfirmation = window.confirm(
      "Are you sure you want to delete the Picture?"
    );
    if (userConfirmation) {
      const username = user.split("@")[0];

      toast.loading("Deleting Profile Picture ...");
      axios
        .delete(
          `https://react-quiz-app-001-default-rtdb.asia-southeast1.firebasedatabase.app/users/${username}/imagegurl.json`
        )
        .then((res) => {
          setImageUrl("");
          toast.remove();
          toast.success("Deleted successfully");
        });
    }
  };
  //render image on upload
  useEffect(() => {
    document.onload = () => {};
  });
  //render image on upload
  return (
    <div>
      <CustomNavbar />
      <Modal
        isOpen={modal}
        toggle={toggle}
        centered
        style={{
          height: 20,
        }}
      >
        <ModalHeader toggle={toggle}>
          <span className="text-center  " style={{ color: "#50A2A7" }}>
            Brainy
          </span>
          <span> Account </span>
        </ModalHeader>
        <ModalBody className="   ">
          {second ? (
            <div className="second">
              <h3 className="mb-1  ">
                <Button
                  onClick={(e) => setSecond((e) => !e)}
                  className="px-4 p-2  text-dark btn-outline-light  rounded rounded-5  "
                  style={{
                    backgroundColor: "#c2e7ff",
                    fontSize: 12,
                    fontWeight: "500",
                  }}
                >
                  <i class="fa-solid fa-arrow-left"></i>
                </Button>{" "}
                Upload Picture{" "}
              </h3>
              <p style={{ fontSize: 13 }}>
                A picture helps people to recognise you and lets you know when
                you’re signed in to your account
              </p>
              <div className="d-flex justify-content-center   ">
                <div className="im text-center       ">
                  <div className="d-flex justify-content-center mb-4 ">
                    {" "}
                    <img
                      id="previewImage"
                      src="#"
                      height={130}
                      width={130}
                      alt="Image Preview"
                      style={{
                        display: "none",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    ></img>
                  </div>
                  Drag photo here <br />
                  or <br />
                  <input
                    type="file"
                    name="file"
                    className="form-control"
                    id="fileInput"
                    ref={fileInputRef}
                    onChange={(e) => {
                      handleFileChange(e);
                      setImage(e.target.files[0]);
                    }}
                  />{" "}
                </div>
              </div>
              <ModalFooter className="d-flex  justify-content-center border-0   ">
                <Button
                  className="px-4 p-2  text-dark btn-outline-light  rounded rounded-5   "
                  style={{
                    backgroundColor: "#c2e7ff",
                    fontSize: 12,
                    fontWeight: "500",
                  }}
                  onClick={submitImage}
                >
                  <i class="fa-solid fa-cloud-arrow-up"></i> &nbsp;Upload
                </Button>
                <Button
                  className="px-4 p-2  text-dark btn-outline-light  rounded rounded-5   "
                  style={{
                    backgroundColor: "#c2e7ff",
                    fontSize: 12,
                    fontWeight: "500",
                  }}
                  onClick={toggle}
                >
                  <i class="fa-solid fa-trash-can"></i> &nbsp;Remove
                </Button>
              </ModalFooter>
            </div>
          ) : (
            <div className="first">
              {" "}
              <h3 className="mb-1  ">Profile Picture fist </h3>
              <p style={{ fontSize: 13 }}>
                A picture helps people to recognise you and lets you know when
                you’re signed in to your account
              </p>
              <div className="d-flex justify-content-center   ">
                <img
                  src={imageUrl ? imageUrl : aron}
                  alt=""
                  height={250}
                  width={250}
                  style={{
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                ></img>
              </div>
              <ModalFooter className="d-flex  justify-content-center border-0   ">
                <Button
                  onClick={(e) => {
                    console.log("ededdw");

                    setSecond((e) => !e);
                  }}
                  className="px-4 p-2  text-dark btn-outline-light  rounded rounded-5  "
                  style={{
                    backgroundColor: "#c2e7ff",
                    fontSize: 12,
                    fontWeight: "500",
                  }}
                >
                  <i class="fa-solid fa-pencil"></i> &nbsp;Change
                </Button>{" "}
                <Button
                  className="px-4 p-2  text-dark btn-outline-light  rounded rounded-5   "
                  style={{
                    backgroundColor: "#c2e7ff",
                    fontSize: 12,
                    fontWeight: "500",
                  }}
                  onClick={removeImage}
                >
                  <i class="fa-solid fa-trash-can"></i> &nbsp;Remove
                </Button>
              </ModalFooter>
            </div>
          )}
        </ModalBody>
      </Modal>
      <Container>
        <Row>
          <Col className="sidebar">
            <div
              className="text-center  camera position-relative   mt-5 "
              style={{ height: 120, width: 140 }}
            >
              <img
                src={imageUrl ? imageUrl : aron}
                alt=""
                height={120}
                width={120}
                style={{
                  borderRadius: "50%",
                  boxShadow: "0px 0px 10px black",
                  objectFit: "cover",
                }}
              ></img>

              <div
                className="position-absolute text-white cam fast-fader d-none        "
                style={{ left: 60, top: 80, cursor: "pointer" }}
              >
                <i
                  class="fa-solid fa-xl fa-camera"
                  onClick={(e) => {
                    toggle();
                    console.log("fefwefefwef");
                  }}
                ></i>
              </div>
              {/* <div>
                <i
                  className="fas fa-pencil-alt        "
                  style={{ fontSize: 20, marginTop: 100 }}
                ></i>
              </div> */}
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
