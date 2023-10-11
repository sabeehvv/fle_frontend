import React from "react";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../../utils/constants";

import EventIcon from "@mui/icons-material/Event";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PeopleIcon from "@mui/icons-material/People";

const textStyle = {
  fontFamily: "cursive",
  fontSize: "18px",
  margin: "10px 0",
};

const EventItem = ({ event }) => {
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

  return (
    <Card>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={5}>
            <img
              src={baseUrl + event.image}
              alt={event.event_name}
              style={{ width: "100%", borderRadius: "20px" }}
            />
          </Grid>
          <Grid item xs={12} sm={7}>
            <Typography variant="h3" style={textStyle}>
              <span style={{ fontWeight: "bold" }}>
                <span
                  style={{
                    textDecoration: "underline",
                    borderBottom: "1px solid #000",
                  }}
                >
                  {/* <EventIcon
                    style={{ verticalAlign: "middle", marginRight: "5px" }}
                  /> */}

                  {event.event_name}
                </span>
              </span>
            </Typography>
            <Typography style={textStyle}>
              <EventIcon
                style={{ verticalAlign: "middle", marginRight: "5px" }}
              />
              {formatDate(event.date_and_time)}
            </Typography>
            <Typography style={textStyle}>
              <LocationOnIcon
                style={{ verticalAlign: "middle", marginRight: "5px" }}
              />
              Venue: {event.venue}
            </Typography>
            <Typography style={textStyle}>
              <PeopleIcon
                style={{ verticalAlign: "middle", marginRight: "5px" }}
              />
              Participants Limit: {event.maximum_participants}
            </Typography>
            {/* <Typography style={textStyle}>
              <MonetizationOnIcon
                style={{ verticalAlign: "middle", marginRight: "5px" }}
              />
              Crowd Fund Event: {event.crowdfunding_event ? "Yes" : "No"}
            </Typography> */}
            {event.crowdfunding_event ? (
              <Typography style={textStyle}>
                &#8377; Crowd Fund Target: {event.target_amount}
              </Typography>
            ) : (
              <></>
            )}

            <Grid
              container
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <Grid
                item
                xs={12}
                sm={6}
                style={{ display: "flex", justifyContent: "center" }}
              >
                {event.crowdfunding_event ? (
                  <Link to={`/events/contribution/${event.id}`}>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ width: "200px" }}
                    >
                      Contribute
                    </Button>
                  </Link>
                ) : (
                  <></>
                )}
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Link to={`/events/eventdetail/${event.id}`}>
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{ width: "200px" }}
                  >
                    Join
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default EventItem;
