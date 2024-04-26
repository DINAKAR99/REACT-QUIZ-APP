// Sidebar.jsx

import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";

const UserSidebar = ({ handleButtonClick }) => {
  return (
    <div
      className="sidebar border-3 position-fixed           bg-black"
      style={{ height: "100vh", width: "30vh" }}
    >
      <Nav vertical navbar fill className="text-white   ">
        <div div className="  text-end custom ">
          <i className="fa-solid fa-xmark me-3  "></i>
        </div>
        <NavItem>
          <NavLink
            className=" border-top      border-bottom border-opacity-50      border-white  custom "
            href="dashboard"
          >
            Admin Dashboard
          </NavLink>
        </NavItem>
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
            href="allusers"
          >
            Users
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  );
};

export default UserSidebar;
