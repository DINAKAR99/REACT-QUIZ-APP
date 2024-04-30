import React, { useEffect, useState } from "react";

import dummy from "./pictures/dummy.png";

import { NavLink as ReactLink, useNavigate } from "react-router-dom";
import {
  Button,
  Collapse,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Nav,
  NavItem,
  NavLink,
  Navbar,
  NavbarBrand,
  NavbarToggler,
} from "reactstrap";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import axios from "axios";
// import { doLogout, getCurrentUserDetail, isloggedIn } from "../auth";
// import { userContext } from "../context/userContext";
const HomeNavbar = () => {
  // const userContextData = useContext(userContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(undefined);
  const [username, setUsername] = useState("");
  const [modal, setModal] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    const userr = sessionStorage.getItem("usermail");
    setUser((e) => userr);

    let username = userr?.split("@")[0];
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

    //first fecth if username
    axios
      .get(
        `https://react-quiz-app-001-default-rtdb.asia-southeast1.firebasedatabase.app/users/${username}.json`
      )
      .then((response) => {
        if (response.data == null) {
          console.log("yeh no image   ");
          console.log(response.data);
        } else {
          console.log(response.data);
          setUsername((e) => response.data.userName);
        }
      });
  }, []);
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

  // return function Example(args) {
  //   const [isOpen, setIsOpen] = useState(false);

  const toggler = () => setModal(!modal);
  return (
    <div>
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
        <ModalHeader toggle={toggler} className="    ">
          <h6 className="mx-auto  text-dark   "> {user ? user : "loading"} </h6>
        </ModalHeader>
        <ModalBody className="text-center    ">
          <img
            src={imageUrl ? imageUrl : dummy}
            alt=""
            height={70}
            width={70}
            style={{
              border: "1px solid white",

              borderRadius: "50%",
              boxShadow: "0px 0px 4px white",
              objectFit: "cover",
            }}
          ></img>
          <h5 className="text-uppercase text-dark mt-2  ">
            {" "}
            {username ? username.toUpperCase() : "loading"}
          </h5>
          <Button
            className="rounded-4 px-3  bg-dark   "
            onClick={() => window.open("/user/manageAccount")}
          >
            Manage your Account
          </Button>
        </ModalBody>

        <ModalFooter
          className="   d-flex justify-content-center border-0  p "
          // style={{ backgroundColor: "hsl(0, 0%, 85%)" }}
        >
          <Button className="px-4 bg-dark  rounded-4 " onClick={logout}>
            <i className="fa-solid fa-arrow-right-from-bracket"></i> &nbsp; Sign
            out
          </Button>
        </ModalFooter>
      </Modal>

      <Navbar dark expand="md" fixed=" " className="p-0 bg-black  ">
        <NavbarBrand tag={ReactLink} to="/">
          <h2 className="brainbytes">BRAINYBITS</h2>
        </NavbarBrand>
        <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
        <Collapse isOpen={isOpen} navbar>
          <Nav navbar className="ms-auto  ">
            {!user ? (
              <>
                <NavItem>
                  <NavLink tag={ReactLink} to="/Login" className="text-white  ">
                    LOGIN
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    tag={ReactLink}
                    to="/Signup"
                    className="text-white  "
                  >
                    SIGNUP
                  </NavLink>
                </NavItem>
              </>
            ) : (
              <>
                <NavItem>
                  <NavLink tag={ReactLink} to="#" className="mt-2  ">
                    {user}
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
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};
// };
export default HomeNavbar;
