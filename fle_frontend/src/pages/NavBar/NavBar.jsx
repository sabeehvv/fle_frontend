import React, { useEffect, useState } from "react";
import { googleLogout } from "@react-oauth/google";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  MenuItem,
  List,
  TextField,
  Box,
  Avatar,
  IconButton,
  Popover,
  ListItem,
  Badge,
  Drawer,
  useTheme,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { DarkMode, LightMode } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";

import { baseUrl } from "../../utils/constants";

import { logout, setMode } from "../../redux_toolkit/valueSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate ,useLocation} from "react-router-dom";
import Cookies from "js-cookie";
import logo from "../../images/icon.png";

import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import { onMessage } from "firebase/messaging";
import { firebaseConfig } from "../../main";

const Navbar = ({ onSearchChange }) => {
  const isMobile = window.innerWidth <= 768;
  const userInfo = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const app = initializeApp(firebaseConfig);
  const messaging = getMessaging(app);
  const [notification, setNotification] = useState([]);
  const [notificationsAnchor, setNotificationsAnchor] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const location = useLocation();
  const isNotRootPath = location.pathname !== "/";
  console.log(location,'location')

  const theme = useTheme();
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsDrawerOpen(open);
  };

  const handleNotificationsClick = (event) => {
    setNotificationsAnchor(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchor(null);
  };

  useEffect(() => {
    const unsubscribe = onMessage(messaging, (payload) => {
      setNotification((prev) => [...prev, payload.notification]);
      console.log("Message", payload);
    });

    return () => {
      unsubscribe();
    };
  }, []);

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

  return (
    <AppBar
      position="fixed"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
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
            onChange={onSearchChange}
            onClick={() => {
              navigate("/events");
            }}
          />
        </div>
        {isNotRootPath ? (
          <>
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: "dark", fontSize: "25px" }} />
              )}
            </IconButton>
          </>
        ) : (
          <></>
        )}

        <div style={{ width: "50%", textAlign: "right" }}>
          {isMobile ? (
            <>
              <IconButton
                edge="start"
                aria-label="menu"
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>

              <Drawer
                anchor="right"
                open={isDrawerOpen}
                onClose={toggleDrawer(false)}
              >
                <div
                  role="presentation"
                  onClick={toggleDrawer(false)}
                  onKeyDown={toggleDrawer(false)}
                >
                  <List style={{ width: "200px", padding: "16px" }}>
                    <MenuItem
                      onClick={() => {
                        navigate("/");
                      }}
                    >
                      Home
                    </MenuItem>
                    {/* <MenuItem >About</MenuItem> */}
                    <MenuItem
                      onClick={() => {
                        navigate("/events");
                      }}
                    >
                      Events
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        navigate("/volunteers");
                      }}
                    >
                      Volunteers
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        navigate("/contributors");
                      }}
                    >
                      Contributors
                    </MenuItem>
                    {userInfo.id ? (
                      <>
                        <MenuItem
                          onClick={() => {
                            logoutHandler();
                          }}
                        >
                          <Link to="/login" style={{ textDecoration: "none" }}>
                            <LogoutIcon />
                          </Link>
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            navigate("/profile");
                          }}
                        >
                          <Avatar
                            src={baseUrl + userInfo.picture}
                            alt="Profile"
                          />
                        </MenuItem>
                      </>
                    ) : (
                      <MenuItem
                        onClick={() => {
                          navigate("/login");
                        }}
                      >
                        Login
                      </MenuItem>
                    )}
                  </List>
                </div>
              </Drawer>
            </>
          ) : (
            <Box textAlign="right">
              <Button onClick={() => navigate("/")}>Home</Button>
              {/* <Button color="inherit">About</Button> */}
              {/* <Button color="inherit">Get Involved</Button> */}
              <Button onClick={() => navigate("/events")}>Events</Button>
              <Button onClick={() => navigate("/volunteers")}>
                Volunteers
              </Button>
              <Button onClick={() => navigate("/Contributors")}>
                Contributors
              </Button>
              <IconButton onClick={handleNotificationsClick}>
                <Badge badgeContent={notification.length} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              {userInfo.id ? (
                <>
                  <Button onClick={logoutHandler}>
                    <Link to="/login" style={{ textDecoration: "none" }}>
                      <LogoutIcon />
                    </Link>
                  </Button>

                  <Button onClick={() => navigate("/profile")}>
                    <Avatar src={baseUrl + userInfo.picture} alt="Profile" />
                  </Button>
                </>
              ) : (
                <Button onClick={() => navigate("/login")}>Login</Button>
              )}
            </Box>
          )}
        </div>
      </Toolbar>
      <Popover
        open={Boolean(notificationsAnchor)}
        anchorEl={notificationsAnchor}
        onClose={handleNotificationsClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <List>
          {notification.map((notification, index) => (
            <ListItem key={index}>
              <strong>{notification.title}</strong>: {notification.body}
            </ListItem>
          ))}
        </List>
      </Popover>
    </AppBar>
  );
};

export default Navbar;
