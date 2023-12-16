import React, { useState, useEffect } from "react";
import { AppBar } from "@mui/material";
import Navbar from "../NavBar/NavBar";
import WelcomePage from "./Welcome";
import MiddlePage from "./MidddlePage";
import NewsFeed from "./NewsFeed";
import PublicAxios from "../../components/Axios/PublicAxios";

const Home = () => {
  const [Video_url, setVideo_url] = useState("");
  const [Announcement, setAnnouncement] = useState("");

  const fetchHomeData = () => {
    PublicAxios.get("home/landing-page-View/")
      .then((response) => {
        console.log(response.data);
        setAnnouncement(response.data.announcement_text);
        setVideo_url(response.data.video_url);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchHomeData();
  },[]);
  
  return (<>
    <div style={{ backgroundColor: "#e7e8e7" }}>
      <AppBar position="static">
        <Navbar />
      </AppBar>
      
      <WelcomePage Video_url={Video_url} />
      </div>
      <NewsFeed Announcement={Announcement} />
      <MiddlePage />
    </>
  );
};

export default Home;
