import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  List,
  TextField,
  Box,
  colors,
} from "@mui/material";

import { logout } from "../../redux_toolkit/valueSlice";
import { setCredentials } from "../../redux_toolkit/valueSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Navbar = ({ onSearchChange }) => {
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
  const [is_authenticate, setAuthed] = useState(false);
  const token = localStorage.getItem("token");
  const isMobile = window.innerWidth <= 768;
  const userInfo = useSelector((state) => state.AdminInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let authTokens = null;
  useEffect(() => {
    setTimeout(() => {
      authTokens = Cookies.get("AdminTokens");
      if (!authTokens) {
        dispatch(logout({ role: "ADMIN" }));
      }
    }, 5000);
  }, [authTokens, dispatch]);

  const logoutHandler = async () => {
    dispatch(logout({ role: "ADMIN" }));
    navigate("/admin/login");
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  return (
    <AppBar
      position="fixed"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
    >
      <Toolbar>
        <div style={{ display: "flex", alignItems: "center", width: "50%" }}>
          {/* <img
            src="icon.png"
            alt="Logo"
            width="40"
            height="40"
            style={{ marginRight: "8px" }}
          /> */}
          <Typography
            variant="h3"
            component="div"
            fontWeight="bold"
            fontSize="clamp(1rem , 3rem ,2.25rem)"
            color="primary"
          >
            FLE <span style={{ color: "Highlight" }}>admin</span>
          </Typography>

          <TextField
            label="Search Events"
            variant="outlined"
            size="small"
            style={{ marginLeft: "16px", flexGrow: 0.3 }}
            onChange={onSearchChange}
          />
        </div>
        <div style={{ width: "50%", textAlign: "right" }}>
          {isMobile ? (
            <>
              <Button color="inherit" onClick={handleMobileMenuOpen}>
                Menu
              </Button>
              <Menu
                anchorEl={mobileMenuAnchor}
                open={Boolean(mobileMenuAnchor)}
                onClose={handleMobileMenuClose}
              >
                <List style={{ display: "flex", flexDirection: "column" }}>
                  <MenuItem>Home</MenuItem>
                  <MenuItem>UserList</MenuItem>
                  <MenuItem>Login/Logout</MenuItem>
                </List>
              </Menu>
            </>
          ) : (
            <Box textAlign="right">
              <Link
                to="/admin"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Button color="inherit">Home</Button>
              </Link>
              <Button
                color="inherit"
                onClick={() => navigate("/admin/userlist")}
              >
                UserList
              </Button>
              <Button
                color="inherit"
                onClick={() => navigate("/admin/eventlist")}
              >
                Events
              </Button>
              {userInfo.id ? (
                <Button color="inherit" onClick={logoutHandler}>
                  Logout Admin <br /> {userInfo.first_name}
                </Button>
              ) : (
                <Button color="inherit">
                  <Link
                    to="/"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Login
                  </Link>
                </Button>
              )}

              {/* <Button color="inherit">Profile</Button> */}
            </Box>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
