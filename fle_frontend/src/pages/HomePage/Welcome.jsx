import React from "react";
import { Typography, Paper, Grid } from "@mui/material";
import ReactPlayer from "react-player";

const WelcomePage = ({ Video_url }) => {
  return (
    <div style={{ paddingTop: "70px", minHeight: "100vh", margin: "0px" }}>
      <Grid container margin={"0px"}>
        {/* Left side: Text and description */}
        <Grid item xs={12} md={4}>
          <div style={{ paddingLeft: "80px", paddingTop: "70px" }}>
            <Typography
              variant="h1"
              gutterBottom
              fontWeight="bold"
              color="ActiveBorder"
            >
              <span
                style={{
                  fontFamily: "Your-Special-Font",
                  fontSize: "40px",
                  color: "#a3d637",
                }}
              >
                Free & Abundant Living Experiments
              </span>
              {/* <br /> */}
              <span
                style={{
                  padding: "5px",
                  fontSize: "30px",
                  fontFamily: "Dancing Script, cursive",
                  color: "#c752cb",
                }}
              >
                On a mission to build deeply inclusive societal alternatives.
              </span>
            </Typography>

            <Typography
              variant="body1"
              align="center"
              fontSize="clamp(1rem , 3rem ,1.25rem)"
              color="Highlight"
            ></Typography>
          </div>
        </Grid>

        {/* Right side: Video and frame */}
        <Grid item xs={12} md={8} margin={"0px"}>
          <div
            style={{
              position: "relative",
              paddingTop: "56.25%",
              overflow: "hidden",
            }}
          >
            <ReactPlayer
              url={Video_url}
              playing={true}
              muted={true}
              loop={true}
              controls={false}
              width="100%"
              height="100%"
              style={{ position: "absolute", top: 0, left: 0, margin: 0 }}
            />
            <img
              src="https://res.cloudinary.com/dloscr748/image/upload/v1694309325/ssswqq_lvxz1y.png"
              alt="Frame Photo"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "auto",
                margin: 0,
              }}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default WelcomePage;
