import React from "react";
import { Outlet, Navigate } from "react-router-dom";
const authorized = true;
const AdminRoute = () => {
  return authorized ? <Outlet /> : <Navigate to={"/login"}></Navigate>;
};
export default AdminRoute;
