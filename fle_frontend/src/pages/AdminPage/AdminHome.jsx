import React from "react";
import AdminNavbar from "../NavBar/AdminNavbar";
import { AppBar, Typography, Container } from "@mui/material";
import AdminDashboard from "./AdminDashboard/AdminDashboard";

const AdminHome = () => {
  return (
    <div style={{ backgroundColor: "#fff" }}>
      <AppBar position="static">
        <AdminNavbar />
      </AppBar>
      <AdminDashboard />
    </div>
  );
};

export default AdminHome;
