// Sidebar.jsx

import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";

const Sidebar = ({ handleButtonClick }) => {
  return (
    <div
      className="sidebar  rounded  border-3 border-black border   mt-3   "
      style={{ height: "100vh", backgroundColor: "#B4B4B8" }}
    >
      <Nav vertical navbar fill>
        <NavItem>
          <NavLink
            className="custom   rounded-top  border-bottom border-black "
            href="#"
            onClick={() => handleButtonClick("createQuestion")}
          >
            Dashboard
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink className=" border-bottom border-black custom " href="quiz">
            Quiz Management
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className=" border-bottom border-black custom " href="#">
            Users
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink className=" border-bottom border-black custom " href="#">
            Settings
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  );
};

export default Sidebar;
