import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { baseUrl } from "../../utils/constants";

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
      <CardMedia
        component="img"
        alt={event.event_name}
        height="200"
        image={baseUrl+event.image}
      />
      <CardContent>
  <Typography variant="h5">
    {event.event_name}
  </Typography>
  <Typography>
    Date: {formatDate(event.date_and_time)}
  </Typography>
  <Typography>
    venue: {event.venue}
  </Typography>
  <Typography >
    Description: {event.description}
  </Typography>
</CardContent>

    </Card>
  );
};

export default EventItem;