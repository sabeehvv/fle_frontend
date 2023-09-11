import React from 'react';
import { Paper, TextField, Typography } from '@mui/material';

const EventFilter = ({ filters, onFilterChange }) => {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value });
  };

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Filter Events
      </Typography>
      <TextField
        label="date (YYYY-MM-DD)"
        name="date_and_time"
        value={filters.date_and_time}
        onChange={handleFilterChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="venue"
        name="venue"
        value={filters.venue}
        onChange={handleFilterChange}
        fullWidth
        margin="normal"
      />
    </Paper>
  );
};

export default EventFilter;
