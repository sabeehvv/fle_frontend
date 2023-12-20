import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Button,
  Link,
  Divider,
  Paper,
  CardContent,
  CardMedia,
  Breadcrumbs,
  Toolbar,
} from "@mui/material";
import axiosInstance from "../../components/Axios/Axios";
import { baseUrl } from "../../utils/constants";
import EventRegistrationModal from "./RegistrationModal";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Chat from "./ChatPage";

const EventDetails = () => {
  const { event_id } = useParams();
  const [eventDetails, setEventDetails] = useState(null);
  const [participant, setparticipant] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [availableSlots, setAvailableSlots] = useState(0);
  const userInfo = useSelector((state) => state.userInfo);
  const navigate = useNavigate();
  const isMobile = window.innerWidth <= 768;

  function formatDate(date_and_time) {
    const date = new Date(date_and_time);
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const dayOfWeek = daysOfWeek[date.getDay()];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    const formattedHours = ((hours + 11) % 12) + 1;

    const formattedDate = `${dayOfWeek}, ${month} ${day} - ${formattedHours}:${minutes
      .toString()
      .padStart(2, "0")} ${ampm} IST`;

    return formattedDate;
  }

  const fetchData = () => {
    axiosInstance
      .get(`events/eventlist/detail/${event_id}/`)
      .then((response) => {
        setEventDetails(response.data.event);
        setparticipant(response.data.participant);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, [event_id]);

  useEffect(() => {
    if (eventDetails) {
      const availableSlots =
        eventDetails.maximum_participants - eventDetails.current_participants;
      setAvailableSlots(availableSlots);
    }
  }, [eventDetails]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (!eventDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div
        style={{
          padding: "15px",
          marginTop: "70px",
        }}
      >
        <Container maxWidth="xl">
          <Grid container>
            <Breadcrumbs aria-label="breadcrumb">
              <Link color="inherit" href="/">
                Home
              </Link>
              <Link color="inherit" href="/events">
                Events
              </Link>
              <Typography color="textPrimary">
                {eventDetails.event_name}
              </Typography>
            </Breadcrumbs>
          </Grid>
        </Container>
      </div>
      <Container
        maxWidth="xl"
        style={{ paddingTop: "20px", paddingBottom: "100px" }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 2 }}>
              <Container>
                <CardContent>
                  <Typography variant="h4" gutterBottom>
                    {eventDetails.event_name}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {formatDate(eventDetails.date_and_time)} | Location:{" "}
                    {eventDetails.venue}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Hosted By : {eventDetails.hosting_by.first_name}
                  </Typography>
                </CardContent>

                <CardMedia
                  component="img"
                  image={baseUrl + eventDetails.image}
                  alt="Event Image"
                  style={{
                    width: "80%",
                    height: "auto",
                    marginLeft: "20px",
                    borderRadius: "20px",
                  }}
                />

                <CardContent>
                  <p style={{ whiteSpace: "pre-line" }}>
                    {eventDetails.description}
                  </p>
                  <Divider sx={{ my: 2 }} />

                  <Typography variant="body2" color="textSecondary">
                    Participants Limit: {eventDetails.maximum_participants} |
                    Joined Participants: {eventDetails.current_participants}
                  </Typography>

                  {eventDetails.crowdfunding_event ? (
                    <>
                      <Divider sx={{ my: 2 }} />
                      <Typography variant="body2" color="textSecondary">
                        Crowdfund Target: {eventDetails.target_amount} |
                        Received Amount: {eventDetails.current_amount} | Balance
                        Needed:
                        {eventDetails.target_amount -
                          eventDetails.current_amount}
                      </Typography>
                    </>
                  ) : (
                    <></>
                  )}
                </CardContent>
              </Container>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                position: "sticky",
                top: "70px",
                zIndex: 0,
                background: "#fff",
                ...(isMobile && { paddingBottom: "80px" }),
              }}
            >
              <Chat event_id={event_id} />
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <Toolbar
        style={{
          backgroundColor: "white",
          position: "fixed",
          bottom: 0,
          width: "100%",
          borderTop: "1px solid #ccc",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.8)",
        }}
      >
        <Container>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} sm={7}>
              <div>
                <Typography variant="subtitle1" color="textSecondary">
                  {formatDate(eventDetails.date_and_time)}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {eventDetails.event_name}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={2}>
              <div style={{ textAlign: "right" }}>
                <Typography variant="body2" color="textSecondary">
                  Spots Available:{" "}
                  {eventDetails.maximum_participants -
                    eventDetails.current_participants}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={3}>
              <div style={{ textAlign: "right" }}>
                {eventDetails.hosting_by.user_id === userInfo.id ? (
                  <>
                    <Button
                      variant="contained"
                      onClick={() =>
                        navigate(`/events/edit/${eventDetails.id}`)
                      }
                      style={{
                        width: "120px",
                        marginRight: "10px",
                        backgroundColor: "#cf74d0",
                      }}
                    >
                      Edit Event
                    </Button>
                  </>
                ) : (
                  <>
                    {participant ? (
                      <>
                        {participant.rsvp_status === "Going" ? (
                          <>
                            <Button
                              variant="contained"
                              onClick={openModal}
                              style={{
                                width: "120px",
                                marginRight: "10px",
                                backgroundColor: "#a3d637",
                              }}
                            >
                              You are Going
                            </Button>
                          </>
                        ) : (
                          <>
                            {" "}
                            <Button
                              variant="contained"
                              onClick={openModal}
                              style={{
                                width: "120px",
                                marginRight: "10px",
                                backgroundColor: "#FFDD40",
                              }}
                            >
                              in queue ( {participant.waiting_position} )
                            </Button>
                          </>
                        )}
                      </>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        style={{ width: "120px", marginRight: "10px" }}
                        onClick={openModal}
                      >
                        Join
                      </Button>
                    )}

                    {eventDetails.crowdfunding_event ? (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          navigate(`/events/contribution/${eventDetails.id}`)
                        }
                        style={{ width: "120px" }}
                      >
                        Contribute
                      </Button>
                    ) : (
                      <></>
                    )}
                  </>
                )}
              </div>
            </Grid>
          </Grid>
        </Container>
      </Toolbar>
      <EventRegistrationModal
        event_id={event_id}
        isOpen={isModalOpen}
        onClose={closeModal}
        availableSlots={availableSlots - 1}
        fetchData={fetchData}
        participant={participant ? participant : false}
      />
    </div>
  );
};

export default EventDetails;
