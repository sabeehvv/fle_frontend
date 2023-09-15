import React, { useState } from "react";
import { TextField, Paper } from "@mui/material";
import Button from "@mui/material/Button";
import axiosadminInstance from "../../../components/Axios/AdminAxios";
import { toast } from "react-hot-toast";


function AnnouncementForm() {
  const [announcement, setAnnouncement] = useState("");

  const AnnouncementSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosadminInstance.patch(
        "admin/landing-page-update/",
        { announcement: announcement }
      );

      console.log("Announcement submitted:", announcement);
      console.log(response);
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
    }
  };

  return (
    <Paper elevation={3} style={{ padding: "16px" }}>
      <form onSubmit={AnnouncementSubmit}>
        <TextField
          label="Announcement"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={announcement}
          onChange={(e) => setAnnouncement(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Update Announcement
        </Button>
      </form>
    </Paper>
  );
}

export default AnnouncementForm;
