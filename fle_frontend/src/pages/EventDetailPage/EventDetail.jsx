import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Button,
  Link,
  Divider,
  Paper,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemText,
  Breadcrumbs,
  Box,
  Toolbar,
} from "@mui/material";
import axiosInstance from "../../components/Axios/Axios";
import { baseUrl } from "../../utils/constants";

const EventDetails = () => {
  const { event_id } = useParams();
  const [eventDetails, setEventDetails] = useState(null);

  function formatDate(date_and_time) {
    const date = new Date(date_and_time);
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const dayOfWeek = daysOfWeek[date.getDay()];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    const formattedHours = ((hours + 11) % 12) + 1;

    const formattedDate = `${dayOfWeek}, ${month} ${day} - ${formattedHours}:${minutes
      .toString()
      .padStart(2, "0")} ${ampm} IST`;

    return formattedDate;
  }

  const fetchData = () => {
    axiosInstance
      .get(`events/eventlist/detail/${event_id}/`)
      .then((response) => {
        setEventDetails(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, [event_id]);

  if (!eventDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div
        style={{
          background: "#fff",
          padding: "15px",
          marginTop: "70px",
        }}
      >
        <Container maxWidth="xl">
          <Grid container>
            <Breadcrumbs aria-label="breadcrumb">
              <Link color="inherit" href="/">
                Home
              </Link>
              <Link color="inherit" href="/events">
                Events
              </Link>
              <Typography color="textPrimary">
                {eventDetails.event_name}
              </Typography>
            </Breadcrumbs>
          </Grid>
        </Container>
      </div>
      <Container
        maxWidth="xl"
        style={{ paddingTop: "20px", paddingBottom: "100px" }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 2 }}>
              <Container>
                <CardContent>
                  <Typography variant="h4" gutterBottom>
                    {eventDetails.event_name}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {formatDate(eventDetails.date_and_time)} | Location:{" "}
                    {eventDetails.venue}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Hosted By : {eventDetails.hosting_by}
                  </Typography>
                </CardContent>

                <CardMedia
                  component="img"
                  image={baseUrl + eventDetails.image}
                  alt="Event Image"
                  style={{
                    width: "80%",
                    height: "auto",
                    marginLeft: "20px",
                    borderRadius: "20px",
                  }}
                />

                <CardContent>
                  <Typography variant="body1">
                    {eventDetails.description}
                  </Typography>
                  <Divider sx={{ my: 2 }} />

                  <Typography variant="body2" color="textSecondary">
                    Participants Limit: {eventDetails.maximum_participants} |
                    Joined Participants: {eventDetails.current_participants}
                  </Typography>

                  {eventDetails.crowdfunding_event ? (
                    <>
                      <Divider sx={{ my: 2 }} />
                      <Typography variant="body2" color="textSecondary">
                        Crowdfund Target: {eventDetails.target_amount} |
                        Received Amount: {eventDetails.current_amount} | Balance
                        Needed:
                        {eventDetails.target_amount -
                          eventDetails.current_amount}
                      </Typography>
                    </>
                  ) : (
                    <></>
                  )}
                </CardContent>
              </Container>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 2,
                position: "sticky",
                top: "90px",
                zIndex: 0,
                background: "#fff",
                marginBottom: "100px",
              }}
            >
              <Paper elevation={3} sx={{ p: 2 }}></Paper>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <Toolbar
        style={{
          backgroundColor: "white",
          position: "fixed",
          bottom: 0,
          width: "100%",
          borderTop: "1px solid #ccc",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.8)",
        }}
      >
        <Container>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} sm={7}>
              <div>
                <Typography variant="subtitle1" color="textSecondary">
                  {formatDate(eventDetails.date_and_time)}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {eventDetails.event_name}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={2}>
              <div style={{ textAlign: "right" }}>
                <Typography variant="body2" color="textSecondary">
                  Spots Available:{" "}
                  {eventDetails.maximum_participants -
                    eventDetails.current_participants}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={3}>
              <div style={{ textAlign: "right" }}>
                <Button
                  variant="contained"
                  color="primary"
                  href="/join"
                  style={{ width: "120px", marginRight: "10px" }}
                >
                  Join
                </Button>

                {eventDetails.crowdfunding_event ? (
                  <Button
                    variant="contained"
                    color="primary"
                    href={`/events/contribution/${eventDetails.id}`}
                    style={{ width: "120px" }}
                  >
                    Contribute
                  </Button>
                ) : (
                  <></>
                )}
              </div>
            </Grid>
          </Grid>
        </Container>
      </Toolbar>
    </div>
  );
};

export default EventDetails;
