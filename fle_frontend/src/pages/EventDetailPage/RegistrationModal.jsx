import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import axiosInstance from "../../components/Axios/Axios";
import { toast } from "react-hot-toast";

const EventRegistrationModal = ({
  event_id,
  isOpen,
  onClose,
  availableSlots,
  fetchData,
  participant,
}) => {
  const [bringing_members, setMembersToBring] = useState(0);

  const handleConfirm = async () => {
    try {
      const response = await axiosInstance.post("events/join_to_event/", {
        event_id: event_id,
        bringing_members: bringing_members,
      });
      toast.success(response.data.message);
      fetchData();
      onClose();
    } catch (error) {
      console.log(error);
      toast.error("somthing went wrong");
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axiosInstance.delete(
        `events/delete_join_to_event/${event_id}/`
      );
      console.log(response, "hfgtyrg delete");
      toast.success(response.data.message);
      fetchData();
      onClose();
    } catch (error) {
      console.log(error);
      toast.error("somthing went wrong");
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setMembersToBring(0);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onClose={onClose}>
      {participant ? (
        <>
          {participant.rsvp_status === "Going" ? (
            <>
              <DialogTitle color={"green"}>
                You Are Going{" "}
                {participant.bringing_members > 0 ? (
                  <> with {participant.bringing_members} Members</>
                ) : (
                  ""
                )}
              </DialogTitle>
            </>
          ) : (
            <>
              <DialogTitle color={"greenyellow"}>
                You Are in Waiting List
              </DialogTitle>
            </>
          )}

          <DialogTitle color={"revert-layer"}>
            Do you want to delete this registration?
          </DialogTitle>

          <DialogActions>
            <Button onClick={onClose} color="primary">
              Close
            </Button>
            <Button onClick={handleDelete} color="warning">
              Delete
            </Button>
          </DialogActions>
        </>
      ) : (
        <>
          {availableSlots > 0 ? (
            <>
              {" "}
              <DialogTitle>Are you bringing anyone?</DialogTitle>
              <DialogContent>
                <TextField
                  sx={{
                    margin: "5px",
                    width: "400px",
                  }}
                  label="Number of members to bring"
                  type="number"
                  value={bringing_members}
                  onChange={(e) => {
                    const newValue = parseInt(e.target.value, 10);
                    if (!isNaN(newValue) && newValue <= availableSlots) {
                      setMembersToBring(newValue);
                    }
                  }}
                  inputProps={{ max: availableSlots, min: 0 }}
                />
              </DialogContent>
            </>
          ) : (
            <>
              {availableSlots === 0 ? (
                <>
                  <DialogTitle color={"green"}>
                    Confirm Registration
                  </DialogTitle>
                  <DialogTitle>
                    Event is almost full and only one spot remains
                  </DialogTitle>
                </>
              ) : (
                <>
                  <DialogTitle>
                    Event is full , you can enter into waiting List
                  </DialogTitle>
                </>
              )}
            </>
          )}

          <DialogActions>
            <Button onClick={onClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleConfirm} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default EventRegistrationModal;
