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
  TextField,
} from "@mui/material";
import Navbar from "../../NavBar/AdminNavbar";
import { Pagination } from "@mui/material";
import axiosadminInstance from "../../../components/Axios/AdminAxios";
import Loading from "../../../components/Loading/Loading";
import { useSelector } from "react-redux";
import { baseUrl } from "../../../utils/constants";
import DescriptionModal from "./Description";

const AdminEventListPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isDescriptionModalOpen, setDescriptionModalOpen] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState("");
  const eventsPerPage = 5;

  const [isLoading, setIsloading] = useState(true);
  const userInfo = useSelector((state) => state.AdminInfo);
  const [events, setEvents] = useState([]);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [eventToApprove, setEventToApprove] = useState(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

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
        const updatedData = response.data.map((event) => ({
          ...event,
          target_amount: event.target_amount || 0,
        }));

        setIsloading(false);
        setEvents(updatedData);
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

  const filteredEvents = events.filter((event) => {
    // Search filtering
    const isSearchMatch = Object.values(event).some(
      (attribute) =>
        attribute &&
        typeof attribute === "string" &&
        attribute.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (!isSearchMatch) return false; // Exclude the event if it doesn't match the search query

    // Date filtering
    if (!fromDate && !toDate) return true; // No date filter applied, include all events

    const eventDate = new Date(event.date_and_time);
    const fromDateObj = fromDate ? new Date(fromDate) : null;
    const toDateObj = toDate ? new Date(toDate) : null;

    if (fromDateObj && eventDate < fromDateObj) return false; // Event is before fromDate
    if (toDateObj && eventDate > toDateObj) return false; // Event is after toDate

    return true; // Include the event
  });

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

  const handleSort = (field) => {
    if (field === sortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const sortedEvents = [...filteredEvents];

  if (sortBy) {
    sortedEvents.sort((a, b) => {
      const valueA = a[sortBy];
      const valueB = b[sortBy];

      if (typeof valueA === "string" && typeof valueB === "string") {
        return sortOrder === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
    });
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = sortedEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  return (
    <>
      <Navbar onSearchChange={handleSearchChange} />
      <Container maxWidth="xl" style={{ marginTop: "100px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px",
          }}
        >
          <TextField
            label="From Date"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <Typography variant="h3" align="center">
            Event List
          </Typography>
          <TextField
            label="To Date"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  onClick={() => handleSort("event_name")}
                  style={{ cursor: "pointer" }}
                >
                  Event Name{" "}
                  {sortBy === "event_name" && sortOrder === "asc" ? "↑" : "↓"}
                </TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Hosting By</TableCell>
                <TableCell
                  onClick={() => handleSort("date_and_time")}
                  style={{ cursor: "pointer" }}
                >
                  Date & Time{" "}
                  {sortBy === "date_and_time" && sortOrder === "asc"
                    ? "↑"
                    : "↓"}
                </TableCell>
                <TableCell>Venue</TableCell>
                <TableCell
                  onClick={() => handleSort("crowdfunding_event")}
                  style={{ cursor: "pointer" }}
                >
                  CrowdFunding{" "}
                  {sortBy === "crowdfunding_event" && sortOrder === "asc"
                    ? "↑"
                    : "↓"}
                </TableCell>
                <TableCell
                  onClick={() => handleSort("maximum_participants")}
                  style={{ cursor: "pointer" }}
                >
                  Participants Limit{" "}
                  {sortBy === "maximum_participants" && sortOrder === "asc"
                    ? "↑"
                    : "↓"}
                </TableCell>
                <TableCell
                  onClick={() => handleSort("target_amount")}
                  style={{ cursor: "pointer" }}
                >
                  CrowdFund Target{" "}
                  {sortBy === "target_amount" && sortOrder === "asc"
                    ? "↑"
                    : "↓"}
                </TableCell>
                <TableCell
                  onClick={() => handleSort("event_approved")}
                  style={{ cursor: "pointer" }}
                >
                  Approve{" "}
                  {sortBy === "event_approved" && sortOrder === "asc"
                    ? "↑"
                    : "↓"}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentEvents.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>{event.event_name}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => {
                        setSelectedDescription(event.description);
                        setDescriptionModalOpen(true);
                      }}
                    >
                      View Description
                    </Button>
                  </TableCell>
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
            onClick={() => {
              handleApprove(eventToApprove), setOpenConfirmation(false);
            }}
            color="primary"
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <DescriptionModal
        open={isDescriptionModalOpen}
        onClose={() => setDescriptionModalOpen(false)}
        description={selectedDescription}
      />
    </>
  );
};

export default AdminEventListPage;
