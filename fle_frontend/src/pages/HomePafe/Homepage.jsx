import React from "react";
import {
  Container,
  Grid,
  Paper,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  AppBar,
  Toolbar,
} from "@mui/material";
import Navbar from "../NavBar/NavBar";
import WelcomePage from "./Welcome";
import MiddlePage from "./MidddlePage";
import NewsFeed from "./NewsFeed";

const Home = () => {

  
  return (
    <div style={{ backgroundColor: "#e7e8e7" }}>
      <AppBar position="static">
        <Navbar />
      </AppBar>
      <WelcomePage />
      <NewsFeed/>
      <MiddlePage />
    </div>
  );
};

export default Home;
