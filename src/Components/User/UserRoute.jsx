import React from "react";
import { Outlet, Navigate } from "react-router-dom";
const authorized = true;
const UserRoute = () => {
  return authorized ? <Outlet /> : <Navigate to={"/login"} />;
};

export default UserRoute;
