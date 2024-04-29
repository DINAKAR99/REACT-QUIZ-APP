import * as yup from "Yup";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  Button,
  Col,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import CustomNavbar from "../../CustomNavbar";
import aron from "../../pictures/dummy.png";
import { MoonLoader } from "react-spinners";
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
  const [userdetails, setUserdetails] = useState({ userName: "din" });
  const [second, setSecond] = useState(false);
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleMouseDown = () => setShowPassword(true);
  const handleMouseUp = () => setShowPassword(false);
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

    //fetch user details and store
    axios
      .get(
        `https://react-quiz-app-001-default-rtdb.asia-southeast1.firebasedatabase.app/users/${username}.json`
      )
      .then((response) => {
        console.log(response.data);
        setUserdetails((e) => response.data);
        setLoading(false);
        reset(response.data);
      });
  }, []);
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
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: userdetails || {
      "Confirm Password": "", // Initial value for Confirm Password field
      userName: "ss", // Initial value for Name field
      userssName: "ss", // Initial value for Name field
      empId: "1333", // Initial value for Employee Id field
      Password: "", // Initial value for Password field
      url: { ure: "ddd" }, // Initial value for Password field
    },
  });
  const onSubmit = (data) => {
    console.log(data);
    //fecth user from local storage and set to inital values
    const usermail = sessionStorage.getItem("usermail");
    setUser((e) => usermail);
    const username = usermail.split("@")[0];

    //send the data into firebase db
    toast.loading("Updating Details ...");
    axios
      .put(
        `https://react-quiz-app-001-default-rtdb.asia-southeast1.firebasedatabase.app/users/${username}.json`,
        data
      )
      .then((response) => {
        //now reload after 1 sec
        setTimeout(() => {
          toast.remove();
          toast.success("Updated Successfully");
        }, 1000);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      });
  };
  console.log(errors);
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
        <ModalBody className=" ">
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
                    className="form-control mb-2"
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
              <h3 className="mb-1  ">Profile Picture </h3>
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
          <h2 className="text-center mt-3 ">
            <span className="text-center  " style={{ color: "#50A2A7" }}>
              Brainy
            </span>
            <span> Account Profile</span>
          </h2>
          <Col className="sidebar">
            <div
              className="text-center  camera position-relative   mt-5 "
              style={{ height: 120 }}
            >
              <div className="d-flex justify-content-center ">
                <img
                  src={imageUrl ? imageUrl : aron}
                  alt=""
                  height={170}
                  width={170}
                  style={{
                    borderRadius: "50%",
                    boxShadow: "0px 0px 10px black",
                    objectFit: "cover",
                  }}
                ></img>
              </div>

              <div
                className="position-absolute text-white cam fast-fader d-none        "
                style={{
                  left: 262,
                  top: 120,
                  cursor: "pointer",
                }}
              >
                <i
                  class="fa-solid fa-xl fa-camera"
                  onClick={(e) => {
                    toggle();
                    console.log("fefwefefwef");
                  }}
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
                <h1 className=" ">{user}</h1>
              </div>
            </div>
          </Col>
          <Col md={{ size: 6 }} className="mb-3">
            <div className="border  rounded rounded-4 p-3 shadow-lg  ">
              {loading ? (
                <div
                  className="border rounded-3   shadow-lg   text-center  d-flex justify-content-center align-items-center "
                  style={{ minHeight: "400px" }}
                >
                  <MoonLoader color="#000000" />
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-group ">
                    <label htmlFor="name">Name </label>
                    <input
                      type="text"
                      className={`form-control mb-2 mt-2 ${
                        errors.userName ? "is-invalid" : ""
                      }`}
                      id="userName"
                      placeholder="userName"
                      {...register("userName", {
                        pattern: {
                          value: /\b[A-Za-z ]+$/,

                          message: "User Name must contain only letters",
                        },
                        required: "User Name is required",
                      })}
                    />
                    {errors.userName && (
                      <div className="invalid-feedback">
                        {errors.userName.message}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="employeeId">Employee Id</label>
                    <input
                      type="number"
                      className={`form-control mb-2 mt-2 ${
                        errors["empId"] ? "is-invalid" : ""
                      }`}
                      id="employeeId"
                      placeholder="empId"
                      {...register("empId", {
                        required: "Employee Id is required",
                        pattern: {
                          value: /^\d*\.?\d+$/,
                          message: "Only positive numbers are allowed",
                        },
                        minLength: {
                          value: 4,
                          message:
                            "Employee Id must be at least 4 characters long",
                        },
                      })}
                    />
                    {errors["empId"] && (
                      <div className="invalid-feedback">
                        {errors.empId.message}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      className={`form-control mb-2 mt-2 ${
                        errors.password ? "is-invalid" : ""
                      }`}
                      id="password"
                      placeholder="password"
                      {...register("password", {
                        required: "password is required",
                        minLength: {
                          value: 6,
                          message:
                            "Password must be at least 6 characters long",
                        },
                      })}
                    />
                    {errors["password"] && (
                      <div className="invalid-feedback">
                        {errors.password.message}
                      </div>
                    )}
                    <h6 style={{ fontSize: 14 }}>
                      Show Password{" "}
                      <i
                        class="fa fa-eye d-inline   "
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                      ></i>
                    </h6>
                  </div>
                  <div className="form-group mt-3 ">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                      type="password"
                      className={`form-control mb-2 mt-2 ${
                        errors["conPassword"] ? "is-invalid" : ""
                      }`}
                      id="confirmPassword"
                      placeholder="conPassword"
                      {...register("conPassword", {
                        required: "confirm password is required",
                        minLength: {
                          value: 6,
                          message:
                            "Password must be at least 6 characters long",
                        },
                        validate: (value) =>
                          value === watch("password") ||
                          "The passwords do not match",
                      })}
                    />
                    {errors["conPassword"] && (
                      <div className="invalid-feedback">
                        {errors.conPassword.message}
                      </div>
                    )}
                  </div>
                  <input type="submit" className="btn btn-primary mt-3 " />
                </form>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ManageAccount;
