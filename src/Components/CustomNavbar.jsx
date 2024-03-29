import React, { useState, useEffect } from "react";
import logo from "./pictures/StaticBit.png";
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

const CustomNavbar = () => {
  // const userContextData = useContext(userContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(undefined);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("userDetails")) {
      setUser(() => JSON.parse(sessionStorage.getItem("userDetails")).user);
      console.log(JSON.parse(sessionStorage.getItem("userDetails")).user);
      setLogin(true);
    }
  }, [login]);
  const logout = () => {
    //loggged out
    setLogin(false);
    sessionStorage.removeItem("userDetails");
    navigate("/");
  };

  // return function Example(args) {
  //   const [isOpen, setIsOpen] = useState(false);

  const toggler = () => setModal(!modal);

  return (
    <div style={{ marginBottom: 85 }}>
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
        <ModalHeader toggle={toggler} className="google-card   ">
          {user?.email}
        </ModalHeader>
        <ModalBody className="text-center google-card ">
          <i
            className="fa-solid fa-circle-user   "
            style={{ fontSize: 60 }}
          ></i>
          <h3 className="text-uppercase"> {user?.userName} </h3>
          <Button
            className="rounded-4 px-3  bg-dark   "
            onClick={() => {
              navigate("/user/manageAccount");
            }}
          >
            Manage your Account
          </Button>
        </ModalBody>
        <ModalFooter
          className="d-flex justify-content-center border-0"
          style={{ backgroundColor: "#343434" }}
        >
          <Button className="px-4 bg-dark  rounded-4" onClick={logout}>
            <i className="fa-solid fa-arrow-right-from-bracket"></i> Sign out
          </Button>
        </ModalFooter>
      </Modal>

      <Navbar dark expand="md" fixed=" " className="p-0 bg-black fixed-top ">
        <NavbarBrand tag={ReactLink} to="/">
          {/* QUIZ-MASTER */}

          <img src={logo} height={75} alt="" />
        </NavbarBrand>
        <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink tag={ReactLink} to="/" className="text-white ">
                HOME
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} className="text-white " to="/about">
                ABOUT
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                tag={ReactLink}
                className="text-white "
                to="/user/userDashboard"
              >
                DASHBOARD
              </NavLink>
            </NavItem>

            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret className="text-white ">
                MORE
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem tag={ReactLink} to="/contact">
                  Contact Us
                </DropdownItem>
                <DropdownItem tag={ReactLink} to="/admin/dashboard">
                  Admin
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <Nav navbar>
            {login && (
              <>
                <NavItem onClick={toggler}>
                  <NavLink tag={ReactLink}>
                    <span className="text-uppercase text-white   ">
                      {user?.userName} &nbsp;
                    </span>
                    <i className="fa-solid fa-circle-user fa-xl     "></i>
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
