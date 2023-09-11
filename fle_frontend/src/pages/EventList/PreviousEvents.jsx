import React from 'react';
import EventItem from './PreviousEventItem';
import { Grid } from '@mui/material';

const PreviousEvent = ({ events, filters }) => {
  const currentDate = new Date();

  const filteredEvents = events.filter((event) => {
    const { date_and_time, venue } = filters;
    const eventDateAndTime = event.date_and_time ? new Date(event.date_and_time.toLowerCase()) : null;
    const isPastEvent = eventDateAndTime && eventDateAndTime < currentDate;
    return (
      (!date_and_time || event.date_and_time.includes(date_and_time)) &&
      (!venue || event.venue.includes(venue))&& (isPastEvent)
    );
  });

  return (
    <Grid container spacing={2}>
      {filteredEvents.map((event) => (
        <Grid item xs={12} sm={6} md={6} key={event.id}>
          <EventItem event={event} />
        </Grid>
      ))}
    </Grid>
  );
};

export default PreviousEvent;
