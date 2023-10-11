import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
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
      <img
        src={baseUrl + event.image}
        alt={event.event_name}
        style={{ width: "100%", borderRadius: "50px", padding: "10px" }}
      />
      <CardContent>
        <Typography variant="h3" style={textStyle}>
          <span style={{ fontWeight: "bold" }}>
            <span
              style={{
                textDecoration: "underline",
                borderBottom: "1px solid #000",
              }}
            >
              {event.event_name}
            </span>
          </span>
        </Typography>
        <Typography style={textStyle}>
          <EventIcon style={{ verticalAlign: "middle", marginRight: "5px" }} />
          {formatDate(event.date_and_time)}
        </Typography>
        <Typography style={textStyle}>
          <LocationOnIcon
            style={{ verticalAlign: "middle", marginRight: "5px" }}
          />
          Venue: {event.venue}
        </Typography>
        <Typography style={textStyle}>
          <PeopleIcon style={{ verticalAlign: "middle", marginRight: "5px" }} />
          Participated: {event.current_participants} Members
        </Typography>
      </CardContent>
    </Card>
  );
};

export default EventItem;
