import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function UnAuth() {
  const locationRoute = "";
  const userInfo = useSelector((state) => state.userInfo);
  const location = useLocation();
  return userInfo.id ? <Navigate to={`/`} /> : <Outlet />;
}

export default UnAuth;
