import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Navbar from "../NavBar/AdminNavbar";
import { Pagination } from "@mui/material";
import axiosadminInstance from "../../components/Axios/AdminAxios";
import Loading from "../../components/Loading/Loading";
import { useSelector } from "react-redux";
import { baseUrl } from "../../utils/constants";

const AdminEventListPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 15;

  const [isLoading, setIsloading] = useState(true);
  const userInfo = useSelector((state) => state.AdminInfo);
  const [events, setEvents] = useState([]);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [eventToApprove, setEventToApprove] = useState(null);

  function formatDate(date_and_time) {
    const date = new Date(date_and_time);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    const formattedHours = ((hours + 11) % 12) + 1;

    return `${day}/${month}/${year}\n${formattedHours}:${minutes} ${ampm}`;
  }

  const fetchData = () => {
    axiosadminInstance
      .get("admin/eventlist/")
      .then((response) => {
        setIsloading(false);
        setEvents(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openApproveConfirmation = (eventId) => {
    setEventToApprove(eventId);
    setOpenConfirmation(true);
  };

  const filteredEvents = events.filter((event) =>
    Object.values(event).some(
      (attribute) =>
        attribute &&
        typeof attribute === "string" &&
        attribute.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleApprove = (EventId) => {
    confirmApprove(EventId);
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === EventId
          ? { ...event, event_approved: !event.event_approved }
          : event
      )
    );
  };

  const confirmApprove = async (EventId) => {
    try {
      const response = await axiosadminInstance.patch(
        `admin/status-event/${EventId}/`
      );

      console.log(response);
      console.log("Approve event with ID:", EventId);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(
    indexOfFirstEvent,
    indexOfLastEvent
  );

  return (
    <>
      <Navbar onSearchChange={handleSearchChange} />
      <Container maxWidth="xl" style={{ marginTop: "100px" }}>
        <Typography variant="h4" align="center" gutterBottom>
          Event List
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Event Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Hosting By</TableCell>
                <TableCell>Date & Time</TableCell>
                <TableCell>Venue</TableCell>
                <TableCell>CrowdFunding</TableCell>
                <TableCell>Participants Limit</TableCell>
                <TableCell>CrowdFund Target</TableCell>
                <TableCell>Approve</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentEvents.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>{event.event_name}</TableCell>
                  <TableCell>{event.description}</TableCell>
                  <TableCell>
                    <a
                      href={baseUrl + event.image}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src={baseUrl + event.image} width="80" height="60" />
                    </a>
                  </TableCell>
                  <TableCell>{event.hosting_by}</TableCell>
                  <TableCell>{formatDate(event.date_and_time)}</TableCell>
                  <TableCell>{event.venue}</TableCell>
                  <TableCell>
                    {event.crowdfunding_event ? "Yes" : "No"}
                  </TableCell>
                  <TableCell>{event.maximum_participants}</TableCell>
                  <TableCell>{event.target_amount}</TableCell>

                  <TableCell>
                    <Button
                      variant="contained"
                      color={event.event_approved ? "success" : "error"}
                      onClick={() => openApproveConfirmation(event.id)}
                    >
                      {event.event_approved ? "Approved" : "pending approval"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <Pagination
              count={Math.ceil(filteredEvents.length / eventsPerPage)}
              page={currentPage}
              onChange={(event, value) => setCurrentPage(value)}
            />
          </div>
        </TableContainer>
      </Container>
      <Dialog
        open={openConfirmation}
        onClose={() => setOpenConfirmation(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Approval</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to change the approve status?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmation(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() =>{handleApprove(eventToApprove),setOpenConfirmation(false)}  }
            color="primary"
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AdminEventListPage;
