import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Typography, Paper, Grid } from '@mui/material';

function ContributionAmountsLineChart({ contributionAmounts }) {
  return (
    <Grid container justifyContent="space-between">
      <Grid item xs={12}>
        <Paper elevation={3} style={{ padding: '1rem' }}>
          <Typography variant="h6" gutterBottom>
            Contribution Amounts
          </Typography>
          <LineChart width={1100} height={300} data={contributionAmounts} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="contribution_date" />
            <YAxis />
            <Tooltip
              formatter={(value, name, props) => [value, `Event ID: ${props.payload.event_id}`]}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="amount"
              name="Contribution Amount"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default ContributionAmountsLineChart;
