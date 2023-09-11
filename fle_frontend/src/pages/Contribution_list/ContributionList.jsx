// ContributionList.js
import React from "react";
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
} from "@mui/material";

const ContributionList = () => {
  const contributions = [
    {
      contributorDisplayName: "John Doe",
      contributedAmount: "50",
      dateOfContribution: "2023-09-11",
      eventName: "Event 1",
      eventDate: "2023-09-15",
      eventPlace: "Venue 1",
    },
  ];
  return (
    <Container
      maxWidth="xl"
      style={{ marginTop: "30px", marginBottom: "30px", paddingTop: "20px" }}
    >
      <Typography variant="h4" align="center" mt={2}>
        Contribution List
      </Typography>
      <Paper sx={{ padding: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Contributor Display Name</TableCell>
                <TableCell>Contributed Amount</TableCell>
                <TableCell>Date of Contribution</TableCell>
                <TableCell>Event Name</TableCell>
                <TableCell>Event Date</TableCell>
                <TableCell>Event Place</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contributions.map((contribution, index) => (
                <TableRow key={index}>
                  <TableCell>{contribution.contributorDisplayName}</TableCell>
                  <TableCell>{contribution.contributedAmount}</TableCell>
                  <TableCell>{contribution.dateOfContribution}</TableCell>
                  <TableCell>{contribution.eventName}</TableCell>
                  <TableCell>{contribution.eventDate}</TableCell>
                  <TableCell>{contribution.eventPlace}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default ContributionList;
