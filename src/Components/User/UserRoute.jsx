import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

const UserRoute = () => {
  return sessionStorage.getItem("usermail") ? (
    <Outlet />
  ) : (
    <Navigate to={"/"} />
  );
};

export default UserRoute;
