import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function AdminAuth() {
  const userInfo = useSelector((state) => state.AdminInfo);
  console.log(userInfo, "admin");

  return userInfo.id ? <Outlet /> : <Navigate to="/admin/login" />;
}

export default AdminAuth;
