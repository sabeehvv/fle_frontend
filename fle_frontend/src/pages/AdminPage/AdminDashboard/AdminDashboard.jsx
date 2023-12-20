import React, { useState, useEffect } from "react";
import EventOverviewChart from "../../../components/Admin/EventChart";
import UserCountPieChart from "../../../components/Admin/UsersChart";
import axiosadminInstance from "../../../components/Axios/AdminAxios";
import { Container, Typography, Grid, Paper } from "@mui/material";

function AdminDashboard() {
  const [usersData, setUsersData] = useState(null);
  const [eventsData, setEventsData] = useState(null);

  const fetchHomeData = () => {
    axiosadminInstance
      .get("admin/dashboardData/")
      .then((response) => {
        setUsersData(response.data.user);
        setEventsData(response.data.events);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchHomeData();
  }, []);

  if (!usersData) {
    return <p>Loading</p>;
  }

  const totalUsers = usersData.total_users;
  const totalEvents = usersData.total_events;
  const totalContributions = usersData.Total_Contributions;
  return (
    <Container maxWidth="xl" style={{ marginTop: "100px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} style={{ padding: "1rem" }}>
            <Typography variant="subtitle1">Total Users</Typography>
            <Typography variant="h4">{totalUsers}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} style={{ padding: "1rem" }}>
            <Typography variant="subtitle1">Total Events</Typography>
            <Typography variant="h4">{totalEvents}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} style={{ padding: "1rem" }}>
            <Typography variant="subtitle1">Total Contributions</Typography>
            <Typography variant="h4">{totalContributions}</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper elevation={3}>
            <UserCountPieChart userData={usersData} />
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper elevation={1} style={{ padding: "1rem" }}>
            <EventOverviewChart eventData={eventsData} />
          </Paper>
        </Grid>
      </Grid>

      {/* <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: "1rem" }}>
            <ContributionChart contributionAmounts={contributionData} />
          </Paper>
        </Grid>
      </Grid> */}
    </Container>
  );
}

export default AdminDashboard;
