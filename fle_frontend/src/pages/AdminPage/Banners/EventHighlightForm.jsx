import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import axiosadminInstance from "../../../components/Axios/AdminAxios";
import { toast } from "react-hot-toast";

function EventHighlightForm() {
  const [imageUrl, setImageUrl] = useState("");
  const [availablePositions, setAvailablePositions] = useState([]);
  const [fetchedPositions, setfetchedPositions] = useState([]);
  const [position, setPosition] = useState("");
  const [eventHighlights, setEventHighlights] = useState([]);

  const fetchData = () => {
    axiosadminInstance
      .get("admin/EventHighlight/")
      .then((response) => {
        setEventHighlights(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(eventHighlights);
    const fetchedPositions = eventHighlights.map((event) => event.id);
    const allPositions = Array.from({ length: 12 }, (_, i) => i + 1);
    const positionsToDisplay = allPositions.filter(
      (pos) => !fetchedPositions.includes(pos)
    );
    setAvailablePositions(positionsToDisplay);
  }, [eventHighlights]);

  // useEffect(() => {
  //   // Simulate fetching the list of selected positions from the server
  //   // Replace this with your actual API call

  //   setfetchedPositions(fetchedPositions);
  // }, []);

  const validationSchema = Yup.object({
    heading: Yup.string()
      .max(30, "Heading must be at most 30 characters")
      .required("Heading is required"),
    description: Yup.string().required("Description is required"),
    position: Yup.number().required("Position is required"),
    image: Yup.mixed().required("Image is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    const sendForm = new FormData();
    for (let value in values) {
      sendForm.append(value, values[value]);
    }

    console.log(sendForm, "dataaaaaaaaaaaa");

    try {
      const response = await axiosadminInstance.post(
        "admin/EventHighlight-create/",
        sendForm,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      fetchData();
      resetForm();
      setImageUrl("");
      console.log(response, "create events highlights");
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error("somthing went wrong");
    }
  };

  // console.log("Event Highlight submitted:", eventData);
  // resetForm();

  // setImageUrl("");
  // };

  const handleDelete = async (positionToDelete) => {
    try {
      const response = await axiosadminInstance.delete(
        `admin/EventHighlight-delete/${positionToDelete}/`
      );

      console.log(response, "hfgtyrg delete");
      toast.success(response.data.message);

      const updatedEventHighlights = eventHighlights.filter(
        (event) => event.id !== positionToDelete
      );
      setEventHighlights(updatedEventHighlights);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Paper elevation={3} style={{ padding: "16px" }}>
        <Typography variant="h6" gutterBottom>
          Add Event Highlight
        </Typography>
        <Formik
          initialValues={{
            heading: "",
            description: "",
            position: "",
            image: null,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form style={{ display: "flex", flexDirection: "column" }}>
              <Field name="heading">
                {({ field }) => (
                  <TextField
                    {...field}
                    label="Heading"
                    variant="outlined"
                    fullWidth
                    style={{ marginBottom: "16px" }}
                    error={Boolean(touched.heading && errors.heading)}
                    helperText={touched.heading && errors.heading}
                  />
                )}
              </Field>
              <Field name="description">
                {({ field }) => (
                  <TextField
                    {...field}
                    label="Description"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    style={{ marginBottom: "16px" }}
                    error={Boolean(touched.description && errors.description)}
                    helperText={touched.description && errors.description}
                  />
                )}
              </Field>

              <Field name="position">
                {({ field }) => (
                  <div style={{ marginBottom: "16px" }}>
                    <InputLabel htmlFor="position">Position</InputLabel>
                    <Select
                      {...field}
                      labelId="position"
                      variant="outlined"
                      fullWidth
                      style={{ marginTop: "8px" }}
                      error={Boolean(touched.position && errors.position)}
                    >
                      {availablePositions.map((pos) => (
                        <MenuItem key={pos} value={pos}>
                          {pos}
                        </MenuItem>
                      ))}
                    </Select>
                    {touched.position && errors.position && (
                      <div style={{ color: "red" }}>{errors.position}</div>
                    )}
                  </div>
                )}
              </Field>

              <Field name="image">
                {({ field, form }) => (
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) => {
                        form.setFieldValue(
                          field.name,
                          event.currentTarget.files[0]
                        );

                        setImageUrl(
                          URL.createObjectURL(event.currentTarget.files[0])
                        );
                      }}
                      style={{ marginBottom: "16px" }}
                    />
                  </div>
                )}
              </Field>
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Selected Image"
                  style={{
                    maxWidth: "100%",
                    height: "300px",
                    marginTop: "10px",
                  }}
                />
              )}
              {touched.image && errors.image && (
                <div style={{ color: "red" }}>{errors.image}</div>
              )}
              <Button type="submit" variant="contained" color="primary">
                Add Event Highlight
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
      <div style={{ paddingTop: "50px" }}>
        <Paper elevation={3} style={{ padding: "16px" }}>
          <Typography variant="h6">Delete Event Highlights</Typography>
          <InputLabel htmlFor="delete-position">Select Position</InputLabel>
          <Select
            id="delete-position"
            variant="outlined"
            fullWidth
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {eventHighlights.map((pos) => (
              <MenuItem key={pos.id} value={pos.id}>
                {pos.id} -- {pos.heading}
              </MenuItem>
            ))}
          </Select>
          <Button
            variant="contained"
            color="warning"
            onClick={() => {
              if (position) {
                handleDelete(parseInt(position, 10));
                setPosition("");
              }
            }}
            style={{ marginTop: "16px" }}
          >
            Delete Event
          </Button>
        </Paper>
      </div>
    </>
  );
}

export default EventHighlightForm;
