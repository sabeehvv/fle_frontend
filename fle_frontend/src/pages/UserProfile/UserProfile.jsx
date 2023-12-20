import { useState, useEffect } from "react";
import * as yup from "yup"; // Import yup without useFormik
import axiosInstance from "../../components/Axios/Axios";
import { setCredentials,setpicture } from "../../redux_toolkit/valueSlice";
import Dropzone from "react-dropzone";
import FlexBetween from "../../components/FlexBetween";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../../utils/constants";
import {
  Grid,
  Container,
  Paper,
  TextField,
  Button,
  Avatar,
  Typography,
  Box,
} from "@mui/material";
import Navbar from "../NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { Formik, useFormik } from "formik";

const Schema = yup.object({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  mobile: yup
    .string()
    .required("Enter your phone number")
    .matches(/^\d{10}$/, "Phone number must be 10 digits"),
  place: yup.string().required("Place is required"),
  occupation: yup.string().required("Occupation is required"),
});

const UserDetailsPage = () => {
  const dispatch = useDispatch();
  const picture_url = useSelector((state) => state.profilePicture);
  const userDetails = useSelector((state) => state.UserProfile); 
  const userInfo = useSelector((state) => state.userInfo);
  const [imageError, setImageError] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = async (values) => {
    const formData = new FormData();

    for (let key in values) {
      const value = values[key];
      if (value !== "") {
        formData.append(key, value);
      }
    }

    try {
      const response = await axiosInstance.patch(
        "user/edit-profile/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      
      toast.success(response.data.message)
      const userInfo = response.data.data;
      dispatch(setCredentials({userInfo, role : "USERS"}));
      navigate("/");
    } catch (error) {
      if (error.response) {
        const responseData = error.response.data;

        if (responseData.error) {
          toast.error(responseData.error);
        } else {
          toast.error(error.message);
        }
      } else {
        console.log("Network error:");
      }
    }
  };

  const initialValues = {
    first_name: userInfo.first_name || "",
    last_name: userInfo.last_name || "",
    email: userInfo.email || "",
    mobile: userInfo.mobile || "",
    place: userInfo.place || "",
    occupation: userInfo.occupation || "",
    picture: "",
  };

  useEffect(() => {
    if (!userInfo.email && !userInfo.mobile) {
      navigate("/");
    }
  }, [userInfo.email, userInfo.mobile]);

  return (
    <>
      <Navbar />
      <Container maxWidth="md" style={{ paddingTop: "70px" }}>
        <Paper elevation={3} style={{ padding: "2rem", textAlign: "center" }}>
          <Avatar
            src={imagePreview || baseUrl+userInfo.picture}
            alt="Profile"
            style={{ margin: "auto", marginBottom: "1rem" }}
          />
          <Typography variant="h5" component="div" gutterBottom>
            Update Details
          </Typography>

          <Formik
            initialValues={initialValues}
            validationSchema={Schema}
            onSubmit={handleFormSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
              setFieldValue,
            }) => (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2} paddingBottom={"15px"}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Email"
                      variant="outlined"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      name="email"
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                      disabled
                    />
                    {/* <Typography variant="body2" color="textSecondary" sx={{ textAlign: "left" }}>
                  Email Verification: {emailVerificationStatus}
                </Typography> */}
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Phone Number"
                      variant="outlined"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.mobile}
                      name="mobile"
                      error={touched.mobile && Boolean(errors.mobile)}
                      helperText={touched.mobile && errors.mobile}
                    />
                    {/* <Typography variant="body2" color="textSecondary" sx={{ textAlign: "left" }}>
                  Phone Verification: {phoneVerificationStatus}
                </Typography> */}
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="First Name"
                      variant="outlined"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="first_name"
                      value={values.first_name}
                      error={touched.first_name && Boolean(errors.first_name)}
                      helperText={touched.first_name && errors.first_name}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Last Name"
                      variant="outlined"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.last_name}
                      name="last_name"
                      error={touched.last_name && Boolean(errors.last_name)}
                      helperText={touched.last_name && errors.last_name}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      label="place"
                      variant="outlined"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.place}
                      name="place"
                      error={touched.place && Boolean(errors.place)}
                      helperText={touched.place && errors.place}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="occupation"
                      variant="outlined"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.occupation}
                      name="occupation"
                      error={touched.occupation && Boolean(errors.occupation)}
                      helperText={touched.occupation && errors.occupation}
                    />
                  </Grid>
                  {/* Add similar Grid items for other fields */}
                </Grid>
                <Box
                  gridColumn="span 4"
                  border={`1px solid`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) => {
                      const file = acceptedFiles[0];
                      if (file) {
                        const isFileTypeValid =
                          file.type === "image/jpeg" ||
                          file.type === "image/png";

                        if (!isFileTypeValid) {
                          setImageError("Please select a JPEG or PNG file.");
                          setFieldValue("picture", "");
                        } else {
                          setFieldValue("picture", file);
                          setImageError("");

                          const previewURL = URL.createObjectURL(file);
                          setImagePreview(previewURL);
                        }
                      }
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed `}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input
                          accept="image/jpeg, image/png"
                          {...getInputProps()}
                        />
                        {!values.picture ? (
                          <p style={{ color: "blue" }}>
                            Drag 'n' drop your picture here, or click to select
                          </p>
                        ) : (
                          <FlexBetween>
                            <Typography color="primary">
                              {values.picture.name}
                            </Typography>
                            <EditOutlinedIcon color="primary" />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>

                  {imageError && (
                    <Typography variant="body2" color="error">
                      {imageError}
                    </Typography>
                  )}
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  style={{ alignSelf: "center", marginTop: "1rem" }}
                >
                  Update Details
                </Button>
              </form>
            )}
          </Formik>
        </Paper>
      </Container>
    </>
  );
};

export default UserDetailsPage;
