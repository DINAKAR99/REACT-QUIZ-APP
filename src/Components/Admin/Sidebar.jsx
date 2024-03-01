// Sidebar.jsx

import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";

const Sidebar = ({ handleButtonClick }) => {
  return (
    <div className="sidebar    border-3   bg-black" style={{ height: "100vh" }}>
      <Nav vertical navbar fill className="text-white  ">
        <NavItem>
          <NavLink
            className=" border-top   border-bottom border-opacity-50      border-white  custom "
            href="quiz"
          >
            Quiz Dashboard
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className=" border-bottom border-white border-opacity-50   custom "
            href="#"
          >
            Users
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            className=" border-bottom border-white border-opacity-50  custom "
            href="#"
          >
            Settings
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  );
};

export default Sidebar;
