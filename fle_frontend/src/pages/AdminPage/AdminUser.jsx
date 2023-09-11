import React from "react";
import AdminNavbar from '../NavBar/AdminNavbar'
import UserList from '../AdminPage/UserLIst'
import {
    AppBar,
  } from "@mui/material";

const AdminUser = () => {
  
    return (
      <div style={{ backgroundColor: "#fff" }}>
        <AppBar position="static">
          <AdminNavbar />
        </AppBar>
        <UserList />
      </div>
    );
  };
  
  export default AdminUser;
  