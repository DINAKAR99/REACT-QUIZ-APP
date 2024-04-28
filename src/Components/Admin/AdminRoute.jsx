import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

const AdminRoute = () => {
  return sessionStorage.getItem("admin") ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"}></Navigate>
  );
};
export default AdminRoute;
