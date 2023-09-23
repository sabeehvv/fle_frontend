import React, { useState, useEffect } from "react";
import { TextField, Paper } from "@mui/material";
import Button from "@mui/material/Button";
import axiosadminInstance from "../../../components/Axios/AdminAxios";
import { toast } from "react-hot-toast";

function LandingPageForm() {
  const [videoUrl, setVideoUrl] = useState("");
  const [Announcement, setAnnouncement] = useState("");

  const fetchHomeData = () => {
    axiosadminInstance
      .get("admin/landing-page-View/")
      .then((response) => {
        console.log(response.data);
        setAnnouncement(response.data.announcement_text);
        setVideoUrl(response.data.video_url);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchHomeData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosadminInstance.patch(
        "admin/landing-page-update/",
        { video_url: videoUrl }
      );

      console.log("Video URL submitted:", videoUrl);
      console.log(response);
      toast.success("Updated successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.video_url);
    }
  };

  const AnnouncementSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosadminInstance.patch(
        "admin/landing-page-update/",
        { announcement_text: Announcement }
      );

      console.log("Announcement submitted:", Announcement);
      console.log(response);
      toast.success("Updated successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
    }
  };

  return (
    <>
      <Paper elevation={3} style={{ padding: "16px" }}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Video URL"
            variant="outlined"
            fullWidth
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary">
            Update Video
          </Button>
        </form>
      </Paper>
      <div style={{ paddingTop: "50px" }}>
        <Paper elevation={3} style={{ padding: "16px" }}>
          <form onSubmit={AnnouncementSubmit}>
            <TextField
              label="Announcement"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={Announcement}
              onChange={(e) => setAnnouncement(e.target.value)}
            />
            <Button type="submit" variant="contained" color="primary">
              Update Announcement
            </Button>
          </form>
        </Paper>
      </div>
    </>
  );
}

export default LandingPageForm;
