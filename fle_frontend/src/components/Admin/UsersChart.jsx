import React, { useState, useEffect } from "react";
import { PieChart, Pie, Tooltip, Legend, Cell } from "recharts";
import { Typography, Paper, Grid } from "@mui/material";

function UserCountPieChart({ userData }) {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];
  const [wait, setWait] = useState(true);

  const data = [
    {
      name: "Active Users",
      value: Math.abs(userData.active_users - userData.new_users_count),
    },
    { name: "New Users", value: userData.new_users_count },
    {
      name: "Inactive Users",
      value: Math.abs(userData.total_users - userData.active_users),
    },
  ];
  useEffect(() => {
    setTimeout(() => {
      setWait(false);
    }, 200);
  }, []);

  if (wait) {
    <></>;
  }

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "90vh" }}
    >
      <Paper elevation={4} style={{ padding: "2rem", minWidth: "450px", minHeight:"450px"}}>
        <Typography variant="h4" gutterBottom>
          Users
        </Typography>
        {!wait ? (
          <>
            <PieChart width={350} height={350}>
              <Pie
                dataKey="value"
                nameKey="name"
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={130}
                fill="#8884d8"
                label
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </>
        ) : (
          <></>
        )}
      </Paper>
    </Grid>
  );
}

export default UserCountPieChart;
