import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from '../../components/FlexBetween'
import toast from "react-hot-toast";
// import axios from "../../utils/axios"; // Replace this import with your own axios setup

const registerSchema = yup.object().shape({
  firstName: yup.string().required("Enter your first name"),
  lastName: yup.string().required("Enter your last name"),
  email: yup.string().email("invalid email").required("required"),
  password: yup
    .string()
    .required("required")
    .min(8, "Password must be at least 8 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
    ),
  confirmPassword: yup
    .string()
    .required("required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  location: yup.string().required("enter your location"),
  occupation: yup.string().required("enter your occupation"),
  picture: yup.string().required("upload your picture"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("enter your email"),
  password: yup.string().required("enter your password"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  location: "",
  occupation: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const [imageError, setImageError] = useState("");
  const [user, setUser] = useState({});
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const register = async (values, onSubmitProps) => {
    // Mock API call for registration
    try {
      await toast.promise(
        new Promise((resolve) => setTimeout(resolve, 1000)), // Simulating a loading delay
        {
          loading: "Registering... Please wait.",
          success: "OTP has been sent to your email.",
          error: "Failed to send OTP.",
        }
      );
      navigate("/otp", { state: { email: values.email } });
      onSubmitProps.resetForm();
    } catch (error) {
      console.error(error);
      toast.error("Failed to register.");
    }
  };

  const login = async (values, onSubmitProps) => {
    // Mock API call for login
    try {
      await toast.promise(
        new Promise((resolve) => setTimeout(resolve, 1000)), // Simulating a loading delay
        {
          loading: "Logging in... Please wait.",
          success: "Login successful.",
          error: "Failed to log in.",
        }
      );
      onSubmitProps.resetForm();
      const loggedIn = {
        user: {
          // Mock user data
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          location: "Test Location",
          occupation: "Tester",
          picture: "profile.jpg",
        },
        token: "mock-token",
      };
      localStorage.setItem("token", loggedIn.token);
      dispatch(setLogin(loggedIn));
      navigate("/home");
    } catch (error) {
      console.error(error);
      toast.error("Failed to log in.");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {isLogin && (
              <>
                <Typography
                  fontWeight="bold"
                  sx={{ gridColumn: "span 4" }}
                  fontSize="32px"
                  color="primary"
                >
                  Sign in
                </Typography>
                <Typography
                  fontWeight="500"
                  variant="h5"
                  sx={{ gridColumn: "span 4" }}
                >
                  Welcome to Doodle , every doodle tells a story. What's yours?
                </Typography>{" "}
              </>
            )}

            {isRegister && (
              <>
                <Typography
                  fontWeight="bold"
                  sx={{ gridColumn: "span 4" }}
                  fontSize="32px"
                  color="primary"
                >
                  Sign up
                </Typography>
                <Typography
                  fontWeight="500"
                  variant="h5"
                  sx={{ gridColumn: "span 4" }}
                >
                  Welcome to Doodle , every doodle tells a story. What's yours?
                </Typography>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: "span 4" }}
                />
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
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
                        }
                      }
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input acc {...getInputProps()} />
                        {!values.picture ? (
                          <p>
                            Drag 'n' drop your picture here, or click to select
                          </p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
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
              </>
            )}

            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />

            {isRegister && (
              <TextField
                label="Confirm Password"
                type="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.confirmPassword}
                name="confirmPassword"
                error={
                  Boolean(touched.confirmPassword) &&
                  Boolean(errors.confirmPassword)
                }
                helperText={touched.confirmPassword && errors.confirmPassword}
                sx={{ gridColumn: "span 4" }}
              />
            )}
          </Box>

          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "1rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>

            <div id="signInDiv" style={{ marginLeft: "1px" }}></div>

            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );

  // ... (same as before)
};


export default Form;
