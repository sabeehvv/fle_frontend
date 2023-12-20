import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  InputLabel,
} from "@mui/material";
import dayjs from "dayjs";
import axiosInstance from "../../components/Axios/Axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const EditEventPage = () => {
  const { event_id } = useParams();
  const [error, seterror] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [formData, setFormData] = useState(null);
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();
  const fetchData = () => {
    axiosInstance
      .get(`events/eventlist/detail/${event_id}/`)
      .then((response) => {
        const fetheddata = response.data.event;
        setEvent(fetheddata);
        setFormData({
          event_name: fetheddata.event_name,
          description: fetheddata.description,
          venue: fetheddata.venue,
          image: null,
          maximum_participants: fetheddata.maximum_participants,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleDateChange = (value) => {
    const formattedDateTime = value.toISOString();
    setSelectedDate(formattedDateTime);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sendForm = new FormData();
    if (selectedDate !== null) {
      sendForm.append("date_and_time", selectedDate);
    }

    for (let value in formData) {
      if (formData[value] !== null) {
        sendForm.append(value, formData[value]);
      }
    }

    try {
      const response = await axiosInstance.patch(
        `events/edit_event/${event_id}/`,
        sendForm,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(response.data.message);
      navigate(`/events/eventdetail/${event_id}`);
    } catch (error) {
      console.log(error);
      toast.error("somthing went wrong");
    }
  };

  const minDate = new Date();
  minDate.setHours(minDate.getHours() + 12);

  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 2);

  const startOfQ12022 = dayjs(minDate);
  const endOfQ12022 = dayjs(maxDate);

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="md" style={{ marginTop: "30px" }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        style={{
          fontFamily: "monospace",
          color: "primary",
          fontSize: "2.5rem",
        }}
      >
        Edit Event
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <div>Event Name</div>
            <TextField
              name="event_name"
              value={formData.event_name}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <div>Description</div>
            <TextField
              variant="outlined"
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              required
              multiline
              rows={4}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <InputLabel shrink>Event Image</InputLabel>
            <TextField
              type="file"
              accept="image/*"
              variant="outlined"
              name="image"
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel shrink>.</InputLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Event Date and Time"
                value={dayjs(event.date_and_time)}
                onChange={handleDateChange}
                minDate={startOfQ12022}
                maxDate={endOfQ12022}
                onError={(newError) => seterror(newError)}
                slotProps={{
                  textField: {
                    helperText: error,
                  },
                }}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Event Venue"
              variant="outlined"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Participants Limit"
              variant="outlined"
              fullWidth
              required
              type="number"
              name="maximum_participants"
              value={formData.maximum_participants}
              onChange={handleChange}
              inputProps={{
                min: event.maximum_participants,
                max: 1000,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" fullWidth type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default EditEventPage;
