import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Breadcrumbs,
  Link,
  Box,
} from "@mui/material";
import Navbar from "../NavBar/NavBar";
import Rightside from "./Rightside";
import EventDetails from "./EventDetail";

const EventDetail = () => {
  return (
    <div>
      <Navbar />
      <EventDetails />
    </div>
  );
};

export default EventDetail;
