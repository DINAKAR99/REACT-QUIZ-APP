import React, { useState, useEffect } from "react";
import logo from "./pictures/BRAINBITS2.gif";
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
const HomeNavbar = () => {
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
      <Navbar dark expand="md" fixed=" " className="p-0 bg-black  ">
        <NavbarBrand tag={ReactLink} to="/">
          {/* QUIZ-MASTER */}

          {/* <img src={logo} height={75} alt="" /> */}

          <h2 className="brainbytes">BRAINYBITS</h2>
        </NavbarBrand>
        <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
        <Collapse isOpen={isOpen} navbar>
          <Nav navbar className="ms-auto  ">
            <>
              <NavItem>
                <NavLink tag={ReactLink} to="/Login" className="text-white  ">
                  LOGIN
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={ReactLink} to="/Signup" className="text-white  ">
                  SIGNUP
                </NavLink>
              </NavItem>
            </>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};
// };
export default HomeNavbar;
