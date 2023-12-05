// ContributionList.js
import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Breadcrumbs,
  Grid,
} from "@mui/material";
import axiosadminInstance from "../../components/Axios/AdminAxios";
import publicInstance from "../../components/Axios/PublicAxios";
import Navbar from "../NavBar/NavBar";
import { Link } from "react-router-dom";

const ContributionList = () => {
  const [contributors, setContributors] = useState(null);
  const fetchData = () => {
    publicInstance
      .get("events/Contributors/")
      .then((response) => {
        console.log(response.data);
        setContributors(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div
        style={{
          background: "#fff",
          padding: "15px",
          marginTop: "70px",
        }}
      >
        <Container maxWidth="xl">
          <Grid container>
            <Breadcrumbs aria-label="breadcrumb">
              <Link color="inherit" to="/">
                Home
              </Link>
              <Typography color="textPrimary">Contributors</Typography>
            </Breadcrumbs>
          </Grid>
        </Container>
      </div>
      <Container
        maxWidth="xl"
        style={{ marginTop: "20px", marginBottom: "30px" }}
      >
        <Paper sx={{ padding: 2 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Contributor Given Name</TableCell>
                  <TableCell>Contributed Amount</TableCell>
                  <TableCell>Date of Contribution</TableCell>
                  <TableCell>Event Name</TableCell>
                  <TableCell>Event Date</TableCell>
                  <TableCell>Event Place</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {contributors ? (
                  <>
                    {contributors.map((contribution, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          {contribution.contributor_display_name}
                        </TableCell>
                        <TableCell>
                          {contribution.contribution_amount}
                        </TableCell>
                        <TableCell>
                          {new Date(
                            contribution.contribution_date
                          ).toLocaleString()}
                        </TableCell>
                        <TableCell>{contribution.event_name}</TableCell>
                        <TableCell>
                          {new Date(
                            contribution.date_and_time
                          ).toLocaleString()}
                        </TableCell>
                        <TableCell>{contribution.venue}</TableCell>
                      </TableRow>
                    ))}
                  </>
                ) : (
                  <></>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </>
  );
};

export default ContributionList;
