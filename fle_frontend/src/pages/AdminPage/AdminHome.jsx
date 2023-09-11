import React from "react";
import AdminNavbar from "../NavBar/AdminNavbar";
import { AppBar, Typography, Container } from "@mui/material";

const AdminHome = () => {
  return (
    <div style={{ backgroundColor: "#fff" }}>
      <AppBar position="static">
        <AdminNavbar />
      </AppBar>
      <Container
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '110vh', 
        background: 'linear-gradient(45deg, #FE6B8B, #FF8E53, #FFD700)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
    >
      <Typography variant="h1" style={{ fontSize: '10rem', fontWeight: 'bold' }}>
        FLE
      </Typography>
    </Container>
    </div>
  );
};

export default AdminHome;
