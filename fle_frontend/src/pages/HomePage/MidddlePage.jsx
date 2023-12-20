import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import PublicAxios from "../../components/Axios/PublicAxios";
import { baseUrl } from "../../utils/constants";

const MiddlePage = () => {
  const [eventList, seteventList] = useState([]);

  const fetchData = () => {
    PublicAxios.get("home/EventHighlight-View/")
      .then((response) => {
        seteventList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container
      maxWidth="lg"
      style={{
        marginTop: "30px",
        marginBottom: "30px",
        paddingTop: "20px",
        paddingBottom: "50px",
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Explore Our Event Highlights
      </Typography>
      <Grid container spacing={3}>
        {eventList.map((event, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={baseUrl + event.image}
                alt={event.heading}
                className="card-media"
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {event.heading}
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
