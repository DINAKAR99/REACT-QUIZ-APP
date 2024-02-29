import React, { useState, useEffect } from "react";
import logo from "./pictures/BRAINBITS5.gif";
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
} from "reactstrap";
// import { doLogout, getCurrentUserDetail, isloggedIn } from "../auth";
// import { userContext } from "../context/userContext";
const CustomNavbar = () => {
  // const userContextData = useContext(userContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(undefined);
  useEffect(() => {
    // setLogin(isloggedIn());
    // setUser(getCurrentUserDetail());
  }, [login]);
  const logout = () => {
    doLogout(() => {
      //loggged out
      setLogin(false);
      userContextData.setUser({
        data: null,
        login: false,
      });
      navigate("/");
    });
  };
  // return function Example(args) {
  //   const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar
        color="dark"
        dark
        expand="md"
        fixed=" "
        className="p-0 bg-black   "
      >
        <NavbarBrand tag={ReactLink} to="/">
          {/* QUIZ-MASTER */}

          <img src={logo} height={75} alt="" />
        </NavbarBrand>
        <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink tag={ReactLink} to="/">
                HOME
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/about">
                ABOUT
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/admin/dashboard">
                ADMIN
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/takeQuiz">
                QUIZ
              </NavLink>
            </NavItem>

            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                MORE
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem tag={ReactLink} to="/contact">
                  Contact Us
                </DropdownItem>
                <DropdownItem>Facebook</DropdownItem>
                <DropdownItem divider />

                <DropdownItem>Instagram</DropdownItem>
                <DropdownItem>Linkedin</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <Nav navbar>
            {login && (
              <>
                <NavItem>
                  <NavLink tag={ReactLink} to="/user/Profile-info">
                    Profile
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink tag={ReactLink} to="/user/dashboard">
                    {user.email}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink onClick={logout}>Logout</NavLink>
                </NavItem>
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
