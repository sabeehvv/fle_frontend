import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Typography,
  Avatar,
  Container,
  Breadcrumbs,
  Button,
} from "@mui/material";
import Navbar from "../NavBar/NavBar";
import { Link } from "react-router-dom";
import publicInstance from "../../components/Axios/PublicAxios";
import { baseUrl } from "../../utils/constants";

const VolunteerList = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await publicInstance.get("home/Volunteers-View/");
        setVolunteers(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const openGoogleForm = () => {
    const googleFormUrl = "https://forms.gle/gRNsMMsBFAPsHVvE9";
    window.open(googleFormUrl, "_blank");
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: "15px", marginTop: "70px" }}>
        <Container maxWidth="xl">
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" to="/">
              Home
            </Link>
            <Typography color="textPrimary">Volunteers</Typography>
          </Breadcrumbs>
        </Container>
      </div>
      <Container
        maxWidth="lg"
        style={{ marginTop: "5px", marginBottom: "10px" }}
      >
        <Button variant="contained" color="inherit" onClick={openGoogleForm}>
          Apply as a Volunteer
        </Button>
      </Container>
      <Container
        maxWidth="lg"
        style={{ marginTop: "5px", marginBottom: "30px" }}
      >
        {volunteers ? (
          <>
            {volunteers.map((volunteer, index) => (
              <Paper key={volunteer.id} sx={{ padding: 2, marginBottom: 2 }}>
                <Grid container>
                  <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
                    <Avatar
                      sx={{ width: "200px", height: "200px" }}
                      alt={volunteer.user_first_name}
                      src={baseUrl + volunteer.user_picture}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={8}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant="h5">
                      {volunteer.user_first_name}
                    </Typography>
                    <Typography variant="subtitle1">
                      {volunteer.role}
                    </Typography>
                    <Typography variant="body1">{volunteer.details}</Typography>
                  </Grid>
                </Grid>
              </Paper>
            ))}
          </>
        ) : (
          <></>
        )}
      </Container>
    </>
  );
};

export default VolunteerList;
