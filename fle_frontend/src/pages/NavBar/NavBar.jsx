import React, { useEffect, useState } from "react";
import { googleLogout } from "@react-oauth/google";
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
  Avatar,
} from "@mui/material";

import { baseUrl } from "../../utils/constants";

import { logout } from "../../redux_toolkit/valueSlice";
import { setCredentials } from "../../redux_toolkit/valueSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import logo from "../../images/icon.png";

const Navbar = () => {
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
  const isMobile = window.innerWidth <= 768;
  const userInfo = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let authTokens = null;
  useEffect(() => {
    setTimeout(() => {
      authTokens = Cookies.get("Tokens");
      if (!authTokens) {
        dispatch(logout({ role: "USER" }));
      }
    }, 5000);
  }, [authTokens, dispatch]);

  const logoutHandler = async () => {
    dispatch(logout({ role: "USER" }));
    googleLogout();
    navigate("/");
  };

  console.log("welcome form navbar");

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  return (
    <AppBar
      position="fixed"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
    >
      <Toolbar>
        <div style={{ display: "flex", alignItems: "center", width: "50%" }}>
          <img
            src={logo}
            alt="Logo"
            width="40"
            height="40"
            style={{ marginRight: "8px" }}
          />
          <Typography
            variant="h3"
            component="div"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #a3d637 50%, #cf74d0 50%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              fontWeight: "bolder",
            }}
          >
            FLE
          </Typography>

          <TextField
            label="Search Events"
            variant="outlined"
            size="small"
            style={{ marginLeft: "16px", flexGrow: 0.3 }}
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
                  <MenuItem>About</MenuItem>
                  <MenuItem>Get Involved</MenuItem>
                  <MenuItem>Events</MenuItem>
                  <MenuItem>Volunteers</MenuItem>
                  <MenuItem>Contributions</MenuItem>
                  <MenuItem>Login/Logout</MenuItem>
                  <MenuItem>Profile</MenuItem>
                </List>
              </Menu>
            </>
          ) : (
            <Box textAlign="right">
              <Button color="inherit">
                <Link
                  to="/"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Home
                </Link>
              </Button>
              <Button color="inherit">About</Button>
              {/* <Button color="inherit">Get Involved</Button> */}
              <Button color="inherit" onClick={() => navigate("/events")}>
                Events
              </Button>
              <Button color="inherit" onClick={() => navigate("/volunteers")}>
                Volunteers
              </Button>
              <Button color="inherit" onClick={() => navigate("/Contributors")}>
                Contributors
              </Button>
              {userInfo.id ? (
                <>
                  <Button color="inherit" onClick={logoutHandler}>
                    <Link
                      to="/login"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      Logout
                    </Link>
                  </Button>

                  <Button color="inherit" onClick={() => navigate("/profile")}>
                    <Avatar src={baseUrl + userInfo.picture} alt="Profile" />
                  </Button>
                </>
              ) : (
                <Button color="inherit">
                  <Link
                    to="/login"
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
