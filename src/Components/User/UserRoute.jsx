import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";

const UserRoute = () => {
  let authorized = true;
  useEffect(() => {
    if (localStorage.getItem("user")) {
      authorized = true;
    }
  });
  return authorized ? <Outlet /> : <Navigate to={"/login"} />;
};

export default UserRoute;
