import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";

const AdminRoute = () => {
  let authorized = true;
  useEffect(() => {
    if (sessionStorage.getItem("admin")) {
      authorized = true;
    }
  });

  return authorized ? <Outlet /> : <Navigate to={"/login"}></Navigate>;
};
export default AdminRoute;
