import React, { useState, useEffect } from "react";
import EventOverviewChart from "../../../components/Admin/EventChart";
import UserCountPieChart from "../../../components/Admin/UsersChart";
import ContributionChart from "../../../components/Admin/ContributionChart";
import axiosadminInstance from "../../../components/Axios/AdminAxios";
import { Container, Typography, Grid, Paper } from "@mui/material";
import CountUp from "react-countup";

function AdminDashboard() {
  const [usersData, setUsersData] = useState(null);
  const [eventsData, setEventsData] = useState(null);

  const fetchHomeData = () => {
    axiosadminInstance
      .get("admin/dashboardData/")
      .then((response) => {
        console.log(response.data);
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
            <CountUp end={totalUsers} duration={2} separator="," delay={0.5}>
              {({ countUpRef }) => <Typography variant="h4" ref={countUpRef} />}
            </CountUp>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} style={{ padding: "1rem" }}>
            <Typography variant="subtitle1">Total Events</Typography>
            <CountUp end={totalEvents} duration={2} separator="," delay={0.5}>
              {({ countUpRef }) => <Typography variant="h4" ref={countUpRef} />}
            </CountUp>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} style={{ padding: "1rem" }}>
            <Typography variant="subtitle1">Total Contributions</Typography>
            <CountUp
              end={totalContributions}
              duration={2}
              separator=","
              delay={0.5}
            >
              {({ countUpRef }) => <Typography variant="h4" ref={countUpRef} />}
            </CountUp>
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
          <Paper elevation={3} style={{ padding: "1rem" }}>
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
