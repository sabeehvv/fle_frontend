import React, { useState, useEffect } from "react";
import EventFilter from "./EventFilter";
import EventList from "./EventList";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Breadcrumbs,
  Link,
  Box,
  Button,
} from "@mui/material";
import Navbar from "../NavBar/NavBar";
import PreviousEvent from "./PreviousEvents";
import PublicAxios from "../../components/Axios/PublicAxios";
import { Link as RouterLink } from "react-router-dom";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({ date_and_time: "", venue: "" });

  // useEffect(() => {
  //   document.title = "FLE | Events";
  // }, []);

  const fetchData = () => {
    PublicAxios.get("events/eventlist/")
      .then((response) => {
        setEvents(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div>
      <Navbar />
      <div
        style={{
          background: "#fff", // Background color
          padding: "15px",
          marginTop: "70px", // Adjust padding as needed
        }}
      >
        <Container maxWidth="xl">
          <Grid container justifyContent="space-between" alignItems="center">
            <Breadcrumbs aria-label="breadcrumb">
              <Link color="inherit" component={RouterLink} to="/">
                Home
              </Link>
              <Typography color="textPrimary">Events</Typography>
            </Breadcrumbs>
            <Button
              variant="contained"
              color="primary"
              component={RouterLink}
              to="/createevent"
            >
              Create Event
            </Button>
          </Grid>
        </Container>
      </div>
      <Container
        maxWidth="xl"
        style={{ marginBottom: "30px", paddingTop: "20px" }}
      >
        <Grid container spacing={2}>
          {/* Left Side: Event Filter */}
          <Grid item xs={12} md={3}>
            <Paper
              sx={{
                p: 2,
                position: "sticky", // Make the filter section sticky
                top: "90px", // Stick to the top
                zIndex: 1, // Ensure it's above the event list
                background: "#fff",
              }}
            >
              <EventFilter
                filters={filters}
                onFilterChange={handleFilterChange}
              />
            </Paper>
          </Grid>

          {/* Right Side: Event List */}
          <Grid item xs={12} md={9}>
            <Paper sx={{ p: 2 }}>
              <Box borderBottom={1} pb={1}>
                <Typography variant="h2">Upcoming events</Typography>
              </Box>
              <EventList events={events} filters={filters} />
              <Box paddingTop={"30px"} borderBottom={1} pb={1}>
                <Typography variant="h2">Past Events</Typography>
              </Box>
              <PreviousEvent events={events} filters={filters} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default EventsPage;
