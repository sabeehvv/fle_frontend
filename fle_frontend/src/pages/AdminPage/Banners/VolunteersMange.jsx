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

function VolunteersManage() {
  const [availablePositions, setAvailablePositions] = useState([]);
  const [position, setPosition] = useState("");
  const [volunteers, setVolunteers] = useState([]);
  const [userlist, setUserList] = useState([]);



  const fetchData = () => {
    axiosadminInstance
      .get("admin/VounteersList/")
      .then((response) => {
        setVolunteers(response.data.Volunteers);
        setUserList(response.data.users);
      })
      .catch((error) => {
        console.log(error);
      });  
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const fetchedPositions = volunteers.map((event) => event.id);
    const allPositions = Array.from({ length: 12 }, (_, i) => i + 1);
    const positionsToDisplay = allPositions.filter(
      (pos) => !fetchedPositions.includes(pos)
    );
    setAvailablePositions(positionsToDisplay);
  }, [volunteers]);


  const validationSchema = Yup.object({
    user_id: Yup.number().required("User is required"),
    role: Yup.string()
      .max(100, "Role must be at most 100 characters")
      .required("Role is required"),
    details: Yup.string().required("Details is required"),
    position: Yup.number().required("Position is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    const sendForm = new FormData();
    for (let value in values) {
      sendForm.append(value, values[value]);
    }


    try {
      const response = await axiosadminInstance.post(
        "admin/Vounteer-create/",
        sendForm,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      fetchData();
      resetForm();
      toast.success("EventHighlight created successfully");
    } catch (error) {
      console.log(error);
      toast.error("somthing went wrong");
    }
  };


  const handleDelete = async (positionToDelete) => {
    try {
      const response = await axiosadminInstance.delete(
        `admin/Vounteer-delete/${positionToDelete}/`
      );

      toast.success("Vounteer deleted successfully");

      const updatedVolunteers = volunteers.filter(
        (event) => event.id !== positionToDelete
      );
      setVolunteers(updatedVolunteers);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Paper elevation={3} style={{ padding: "16px" }}>
        <Typography variant="h6" gutterBottom>
          Add Volunteers
        </Typography>
        <Formik
          initialValues={{
            user_id:"",
            role: "",
            details: "",
            position: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form style={{ display: "flex", flexDirection: "column" }}>
              <Field name="user_id">
                {({ field }) => (
                  <div style={{ marginBottom: "16px" }}>
                    <InputLabel htmlFor="user_id">user</InputLabel>
                    <Select
                      {...field}
                      labelId="user_id"
                      variant="outlined"
                      fullWidth
                      style={{ marginTop: "8px" }}
                      error={Boolean(touched.user_id && errors.user_id)}
                    >
                      {userlist.map((user) => (
                        <MenuItem key={user.id} value={user.id}>
                          {user.id} - {user.first_name}
                        </MenuItem>
                      ))}
                    </Select>
                    {touched.user_id && errors.user_id && (
                      <div style={{ color: "red" }}>{errors.user_id}</div>
                    )}
                  </div>
                )}
              </Field>

              <Field name="role">
                {({ field }) => (
                  <TextField
                    {...field}
                    label="role"
                    variant="outlined"
                    fullWidth
                    style={{ marginBottom: "16px" }}
                    error={Boolean(touched.role && errors.role)}
                    helperText={touched.role && errors.role}
                  />
                )}
              </Field>
              <Field name="details">
                {({ field }) => (
                  <TextField
                    {...field}
                    label="details"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    style={{ marginBottom: "16px" }}
                    error={Boolean(touched.details && errors.details)}
                    helperText={touched.details && errors.details}
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

              <Button type="submit" variant="contained" color="primary">
                Add Volunteer
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
      <div style={{ paddingTop: "50px" }}>
        <Paper elevation={3} style={{ padding: "16px" }}>
          <Typography variant="h6">Delete Volunteer</Typography>
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
            {volunteers.map((pos) => (
              <MenuItem key={pos.id} value={pos.id}>
                {pos.id} - {pos.user_first_name} - {pos.role} 
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
            Delete Volunteer
          </Button>
        </Paper>
      </div>
    </>
  );
}

export default VolunteersManage;
