import React from "react";
import { Container, Typography, Grid, Card, CardContent, CardMedia } from "@mui/material";

const eventList = [
  {
    title: "Event 1",
    description: "Description for Event 1",
    image: "https://res.cloudinary.com/dloscr748/image/upload/v1691654677/samples/cloudinary-group.jpg",
  },
  {
    title: "Event 2",
    description: "Description for Event 2",
    image: "https://res.cloudinary.com/dloscr748/image/upload/v1691654692/cld-sample-3.jpg",
  },
  {
    title: "Event 2",
    description: "Description for Event 2",
    image: "https://res.cloudinary.com/dloscr748/image/upload/v1691654692/cld-sample-3.jpg",
  },
  {
    title: "Event 2",
    description: "Description for Event 2",
    image: "https://res.cloudinary.com/dloscr748/image/upload/v1691654692/cld-sample-3.jpg",
  },
  {
    title: "Event 2",
    description: "Description for Event 2",
    image: "https://res.cloudinary.com/dloscr748/image/upload/v1691654692/cld-sample-3.jpg",
  },
  {
    title: "Event 2",
    description: "Description for Event 2",
    image: "https://res.cloudinary.com/dloscr748/image/upload/v1691654692/cld-sample-3.jpg",
  },
  {
    title: "Event 2",
    description: "Description for Event 2",
    image: "https://res.cloudinary.com/dloscr748/image/upload/v1691654692/cld-sample-3.jpg",
  },
  // Add more events...
];

const MiddlePage = () => {
  return (
    <Container maxWidth="lg" style={{ marginTop: "30px", marginBottom: "30px",paddingTop:"20px"}}>
      <Typography variant="h4" align="center" gutterBottom>
        Explore Our Event Highlights
      </Typography>
      <Grid container spacing={3}>
        {eventList.map((event, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card >
              <CardMedia
                component="img"
                height="200"
                image={event.image}
                alt={event.title}
                className="card-media"
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {event.title}
                </Typography>
                <Typography variant="body3">{event.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MiddlePage;
