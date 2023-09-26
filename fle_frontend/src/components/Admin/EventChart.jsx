import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Typography, Paper, Grid } from "@mui/material";
import moment from "moment";
import "./eventChart.css";

function EventOverviewChart({ eventData }) {
  const data = eventData.map((event) => ({
    eventDate: event.date_and_time,
    event_name: event.event_name,
    attendees: event.current_participants,
    contributions: event.Event_Contributors,
    contributedAmount: event.current_amount ? event.current_amount / 10 : null,
    event_id: event.id,
  }));

  data.sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0];
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">Event Date: {label}</p>
          <p className="tooltip-label">
            Event Name: {dataPoint.payload.event_name}
          </p>
          <p className="tooltip-attendees">
            Attendees: {dataPoint.payload.attendees}
          </p>
          <p className="tooltip-contributions">
            Contributers: {dataPoint.payload.contributions}
          </p>
          <p className="tooltip-contributedAmount">
            Contributed Amount: {dataPoint.payload.contributedAmount * 10}
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <Grid container justifyContent="space-between">
      <Grid item xs={12}>
        <Paper elevation={3} style={{ padding: "1rem" }}>
          <Typography variant="h6" gutterBottom>
            Event Overview
          </Typography>
          <BarChart width={1100} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="eventDate"
              tick={{ angle: -10 }}
              tickFormatter={(value) => moment(value).format("MMM DD, YYYY")}
            />
            <YAxis />
            <Tooltip content={CustomTooltip} />
            <Legend />
            <Bar
              dataKey="attendees"
              stackId="a"
              fill="#8884d8"
              name="Attendees"
            ></Bar>
            <Bar
              dataKey="contributions"
              stackId="a"
              fill="#82ca9d"
              name="Contributers"
            />
            <Bar
              dataKey="contributedAmount"
              stackId="a"
              fill="#ffc658"
              name="Contributed Amount"
            />
          </BarChart>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default EventOverviewChart;
