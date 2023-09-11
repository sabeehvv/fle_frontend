import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function AdminUnAuth() {
  const userInfo = useSelector((state) => state.AdminInfo);
  const location = useLocation();

  console.log("called for admin un auth");

  console.log(location);

  return userInfo.id ? <Navigate to={"/admin"} /> : <Outlet />;
}
export default AdminUnAuth;