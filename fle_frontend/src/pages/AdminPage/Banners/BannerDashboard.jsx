import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import LandingPageForm from "./LandingPageForm";
import EventHighlightForm from "./EventHighlightForm";
import Navbar from "../../NavBar/AdminNavbar";
import VolunteersManage from "./VolunteersMange";

function BannerDashboard() {
  return (
    <>
    <Navbar/>
      <Container maxWidth="sm" style={{paddingTop:"150px"}}>
        <Grid container spacing={10}>
          <Grid item xs={12}>
            <LandingPageForm />
          </Grid>
          <Grid item xs={12} style={{paddingBottom:"100px"}}>
            <EventHighlightForm />
          </Grid>
          <Grid item xs={12} style={{paddingBottom:"100px"}}>
            <VolunteersManage />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default BannerDashboard;
