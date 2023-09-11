import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Input,
} from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";
import axiosInstance from "../../components/Axios/Axios";
import { toast } from "react-hot-toast";
import { array } from "yup";
import { useNavigate } from "react-router-dom";

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const CreateEventPage = () => {
  const [error, seterror] = useState(null);
  const [formData, setFormData] = useState({
    event_name: "",
    description: "",
    venue: "",
    image: null,
    maximum_participants: "",
    crowdfunding_event: false,
    target_amount: "",
  });
  const [selectedDate, setSelectedDate] = useState(null);

  const navigate = useNavigate();

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
    console.log(formattedDateTime);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sendForm = new FormData();

    sendForm.append("date_and_time", selectedDate);
    for (let value in formData) {
      sendForm.append(value, formData[value]);
    }
    console.log(sendForm, "dataaaaaaaaaaaa");
    console.log(formData);

    try {
      const response = await axiosInstance.post(
        "events/create_event/",
        sendForm,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(response.data.message);
      toast("Admin Wants to Approve", {
        icon: "⚠️",
        style: {
          borderRadius: "10px",
          background: "#ECE115",
          color: "#fff",
        },
      });
      navigate("/");
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
        Create Event
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Event Name"
              name="event_name"
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              variant="outlined"
              name="description"
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
              required
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel shrink>.</InputLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Event Date and Time"
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
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl variant="outlined" fullWidth required>
              <InputLabel>Event Type</InputLabel>
              <Select
                name="crowdfunding_event"
                onChange={handleChange}
                label="Event Type"
                value={formData.crowdfunding_event}
              >
                <MenuItem value={true}>Crowd Funding Event</MenuItem>
                <MenuItem value={false}>Crowd Funding Not Required</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Participants Limit"
              variant="outlined"
              fullWidth
              required
              type="number"
              name="maximum_participants"
              onChange={handleChange}
              inputProps={{
                min: 0,
                max: 1000,
              }}
            />
          </Grid>
          {formData.crowdfunding_event ? (
            <Grid item xs={12} sm={6}>
              <TextField
                label="Target Amount"
                variant="outlined"
                fullWidth
                type="number"
                value={formData.target_amount}
                name="target_amount"
                onChange={handleChange}
                inputProps={{
                  min: 0,
                }}
              />
            </Grid>
          ) : (
            <></>
          )}
          <Grid item xs={12}>
            <Button variant="contained" color="primary" fullWidth type="submit">
              Create Event
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default CreateEventPage;
