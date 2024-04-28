import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import logo from "./pictures/StaticBit.png";
import dummy from "./pictures/dummy.png";

import { NavLink as ReactLink, useNavigate } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";
import toast from "react-hot-toast";
import { auth } from "../firebase";
import axios from "axios";
// import { doLogout, getCurrentUserDetail, isloggedIn } from "../auth";
// import { userContext } from "../context/userContext";
const CustomNavbar = () => {
  // const userContextData = useContext(userContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const [admin, setAdmin] = useState("");
  const [usermail, setUsermail] = useState("");
  const [modal, setModal] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    let username;
    if (sessionStorage.getItem("usermail")) {
      setLogin(true);
      setUsermail(sessionStorage.getItem("usermail"));
      username = sessionStorage.getItem("usermail").split("@")[0];
    }

    if (sessionStorage.getItem("admin")) {
      setAdmin((e) => "admin_loggedin");
    }
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

  const logout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        sessionStorage.clear();
        const logoutEvent = new Event("logout");
        window.dispatchEvent(logoutEvent);
        toast.success("Signed out successfully");

        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
        console.log("Signed out successfully");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const toggler = () => setModal(!modal);
  //script
  // var prevScrollpos = window.pageYOffset;
  // window.onscroll = function () {
  //   var currentScrollPos = window.pageYOffset;
  //   if (prevScrollpos > currentScrollPos) {
  //     document.getElementById("navbar").style.top = "0";
  //   } else {
  //     document.getElementById("navbar").style.top = "-85px";
  //   }
  //   prevScrollpos = currentScrollPos;
  // };
  //script

  return (
    <div style={{ marginBottom: 80 }}>
      <Modal
        className="text-white"
        isOpen={modal}
        toggle={toggler}
        style={{
          position: "absolute",
          right: 30,
          top: 60,
        }}
      >
        <ModalHeader toggle={toggler} className="google-card    ">
          {usermail}
        </ModalHeader>
        <ModalBody className="text-center  google-card  ">
          <img
            src={imageUrl ? imageUrl : dummy}
            alt=""
            height={60}
            width={60}
            style={{
              border: "1px solid white",

              borderRadius: "50%",
              boxShadow: "0px 0px 4px white",
              objectFit: "cover",
            }}
          ></img>
          <h3 className="text-uppercase  "> Dinakar </h3>
          <Button
            className="rounded-4 px-3  bg-dark   "
            onClick={() => window.open("/user/manageAccount")}
          >
            Manage your Account
          </Button>
        </ModalBody>
        <ModalFooter
          className="   d-flex justify-content-center border-0   "
          style={{ backgroundColor: "#343434" }}
        >
          <Button className="px-4 bg-dark  rounded-4 " onClick={logout}>
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            Sign out
          </Button>
        </ModalFooter>
      </Modal>

      <Navbar dark expand="md" fixed=" " className="p-0 bg-black fixed-top  ">
        <NavbarBrand tag={ReactLink} to="/">
          {/* QUIZ-MASTER */}

          <img src={logo} height={75} alt="" />
        </NavbarBrand>
        <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink tag={ReactLink} to="/" className="text-white ">
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/contact" className="text-white ">
                Contact Us
              </NavLink>
            </NavItem>

            {login && admin == "" && (
              <>
                <NavItem>
                  <NavLink
                    tag={ReactLink}
                    to="/user/userDashboard"
                    className="text-white "
                  >
                    Dashboard
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink
                    tag={ReactLink}
                    to="/admin/dashboard"
                    className="text-white "
                  >
                    Admin
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
          <Nav navbar>
            {login && (
              <>
                <NavItem>
                  <NavLink tag={ReactLink} to="#" className="mt-2  ">
                    {usermail}
                  </NavLink>
                </NavItem>

                <NavItem onClick={toggler}>
                  <NavLink tag={ReactLink}>
                    <img
                      src={imageUrl ? imageUrl : dummy}
                      alt=""
                      height={40}
                      width={40}
                      style={{
                        border: "2px solid grey",

                        borderRadius: "50%",

                        objectFit: "cover",
                      }}
                    ></img>
                  </NavLink>
                </NavItem>
                {/* <NavItem>
                  <NavLink onClick={logout}>Logout</NavLink>
                </NavItem> */}
              </>
            )}
            {!login && (
              <>
                <NavItem>
                  <NavLink tag={ReactLink} to="/Login">
                    LOGIN
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={ReactLink} to="/Signup">
                    SIGNUP
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};
// };
export default CustomNavbar;
