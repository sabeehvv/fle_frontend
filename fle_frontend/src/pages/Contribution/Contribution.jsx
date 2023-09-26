import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Container,
  styled,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import Navbar from "../NavBar/NavBar";
import axiosInstance from "../../components/Axios/Axios";
import { useSelector } from "react-redux";
import PublicAxios from "../../components/Axios/PublicAxios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import EventIcon from "@mui/icons-material/Event";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import logo from "../../images/icon.png";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  width: "100%",
  backgroundColor: "#00d5fa",
  color: "#fff",
}));

const IconWrapper = styled("span")(({ theme }) => ({
  marginRight: theme.spacing(1),
}));

const ContributionPage = () => {
  const { event_id } = useParams();
  const [eventDetails, setEventDetails] = useState(null);
  const userInfo = useSelector((state) => state.userInfo);
  const navigate = useNavigate();

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

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
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert(
        "Failure loading the Razorpay SDK. PLease make sure you are connected to the internet"
      );
      return;
    }

    const orderData = await PublicAxios.post("events/contributon/", {
      amount: formik.values.contributionAmount * 100,
    });

    const { amount, currency, order_id } = orderData.data;

    const options = {
      key: "rzp_test_piQp8r9Ud6kcTO",
      amount: amount.toString(),
      currency: currency,
      name: "Free Living Expirement",
      description: "CrowdFund Transaction",
      image: logo,
      order_id: order_id,
      handler: async function (response) {
        const razorpay_paymentId = response.razorpay_payment_id;
        const razorpay_orderId = response.razorpay_order_id;
        const razorpay_signature = response.razorpay_signature;

        const res = await PublicAxios.post("events/verifySignature/", {
          razorpay_paymentId,
          razorpay_orderId,
          razorpay_signature,
          amount: amount / 100,
          event_id,
          user_id: userInfo.id ? userInfo.id : "",
          dis_name: formik.values.displayName,
        });

        // alert(res.data.status);
        toast.success(`Thanks  ${res.data.status}`, {
          duration: 5000,
        });
        navigate("/events");
      },
      prefill: {
        name: "",
        email: "",
        contact: "",
      },
      theme: {
        color: "#61dafb",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  const initialValues = {
    contributionAmount: "",
    displayName: "",
  };

  const maximum = eventDetails
    ? eventDetails.target_amount - eventDetails.current_amount
    : null;
  const validationSchema = Yup.object({
    contributionAmount: Yup.number()
      .required("Contribution amount is required")
      .min(1, "Contribution amount must be greater than 0")
      .max(maximum, "Contribution exceeds the balance needed"),
    displayName: Yup.string().required("Display name is required"),
  });

  const onSubmit = (values) => {
    alert(
      `Contribution Amount: ${values.contributionAmount}\nDisplay Name: ${values.displayName}`
    );
    displayRazorpay();
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  if (!eventDetails) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <Container maxWidth="sm" style={{ paddingTop: "80px" }}>
        <Paper
          elevation={3}
          style={{ padding: "20px", backgroundColor: "#BCF5FF" }}
        >
          <form onSubmit={formik.handleSubmit}>
            <Grid container alignItems="center">
              <StyledPaper elevation={3}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h4">
                      {eventDetails.event_name}
                    </Typography>
                    <Grid container alignItems="center">
                      <IconWrapper>
                        <EventIcon />
                      </IconWrapper>
                      <Typography>
                        {formatDate(eventDetails.date_and_time)}
                      </Typography>
                    </Grid>
                    <Grid container alignItems="center">
                      <IconWrapper>
                        <LocationOnIcon />
                      </IconWrapper>
                      <Typography>{eventDetails.venue}</Typography>
                    </Grid>
                    <Grid container alignItems="center">
                      <IconWrapper>
                        <PersonIcon />
                      </IconWrapper>
                      <Typography>
                        Hosted By: {eventDetails.hosting_by.first_name}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} paddingTop={2}>
                    <Typography
                      variant="h6"
                      sx={{ textDecoration: "underline" }}
                    >
                      Crowd Fund Details
                    </Typography>
                    <Typography>
                      Target Amount: {eventDetails.target_amount}
                    </Typography>
                    <Typography>
                      Amount Received: {eventDetails.current_amount}
                    </Typography>
                    <Typography>
                      Required Amount:{" "}
                      {eventDetails.target_amount - eventDetails.current_amount}
                    </Typography>
                  </Grid>
                </Grid>
              </StyledPaper>
              <Grid item xs={12} paddingTop={"10px"}>
                <Typography variant="h6">
                  How much would like to contribute ?
                </Typography>
              </Grid>
              <Grid item xs={12} paddingTop={"10px"}>
                <TextField
                  label="Contribution Amount"
                  type="number"
                  variant="outlined"
                  fullWidth
                  id="contributionAmount"
                  name="contributionAmount"
                  value={formik.values.contributionAmount}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.contributionAmount &&
                    Boolean(formik.errors.contributionAmount)
                  }
                  helperText={
                    formik.touched.contributionAmount &&
                    formik.errors.contributionAmount
                  }
                />
              </Grid>
              <Grid item xs={12} paddingTop={"10px"}>
                <TextField
                  label="Display Name"
                  variant="outlined"
                  fullWidth
                  id="displayName"
                  name="displayName"
                  value={formik.values.displayName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.displayName &&
                    Boolean(formik.errors.displayName)
                  }
                  helperText={
                    formik.touched.displayName && formik.errors.displayName
                  }
                />
              </Grid>

              <Grid item xs={12} align="center" style={{ paddingTop: "10px" }}>
                <Button variant="contained" color="primary" type="submit">
                  Contribute
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default ContributionPage;
