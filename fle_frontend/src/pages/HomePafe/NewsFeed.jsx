import React from "react";
import { Container, Typography, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";

const NewsFeed = () => {
  return (
    <Container
      maxWidth="lg"
      style={{ marginTop: "50px", marginBottom: "50px" }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        News Feed
      </Typography>
      <div style={{ padding: "30px 0", textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Special Announcement
        </Typography>
        <Typography variant="body3">
          💃Join FLE Dancing Circle on 20th Aug 6pm at Yogisthan. This will be a
          conmunity crowdfunded event. For partcipation & contribition
        </Typography>
        <br />
        <Link to="/events" style={{ textDecoration: "none", color: "inherit" }}>
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "16px" }}
          >
            Join Events
          </Button>
        </Link>
      </div>
      {/* News articles */}
      <Grid container spacing={3}>
        {/* Example News Article 1 */}
        <Grid item xs={12} md={4}>
          <div style={{ padding: "16px" }}>
            <Typography variant="h6" gutterBottom>
              Event Highlights
            </Typography>
            <Typography variant="body3">
              Check out the latest highlights from our recent events and see the
              impact we're making in our community.
            </Typography>
          </div>
        </Grid>
        {/* Example News Article 2 */}
        <Grid item xs={12} md={4}>
          <div style={{ padding: "16px" }}>
            <Typography variant="h6" gutterBottom>
              Get Involved
            </Typography>
            <Typography variant="body3">
              Want to contribute to our cause? Explore opportunities to
              volunteer, donate, or create your own event.
            </Typography>
            <br />
            <Button
              variant="outlined"
              color="primary"
              style={{ marginTop: "8px" }}
            >
              Contribute Now
            </Button>
          </div>
        </Grid>
        {/* Example News Article 3 */}
        <Grid item xs={12} md={4}>
          <div style={{ padding: "16px" }}>
            <Typography variant="h6" gutterBottom>
              Create Your Event
            </Typography>
            <Typography variant="body3">
              Have an idea for an event that aligns with our mission? Create
              your own event and make a positive impact.
            </Typography>
            <br />
            <Link
              to="/createevent"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Button
                variant="outlined"
                color="primary"
                style={{ marginTop: "8px" }}
              >
                Create Event
              </Button>
            </Link>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default NewsFeed;
