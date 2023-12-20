import React from "react";
import { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";

import publicInstance from "../../components/Axios/PublicAxios";
import { useLocation } from "react-router-dom";
import * as yup from "yup";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import Dropzone from "react-dropzone";
import { useSelector } from "react-redux";
import FlexBetween from "../../components/FlexBetween";
import toast from "react-hot-toast";
import axios from "axios";
import { setCredentials, setLocation } from "../../redux_toolkit/valueSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FcGoogle } from "react-icons/fc";
import Cookies from "js-cookie";
// import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const registerSchema = yup.object().shape({
  first_name: yup.string().required("Enter your first name"),
  last_name: yup.string().required("Enter your last name"),
  email: yup
    .string()
    .email("Invalid email format")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      "Invalid email format"
    )
    .required("Email is required"),
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
  place: yup.string().required("enter your location"),
  occupation: yup.string().required("enter your occupation"),
  picture: yup.string(),
  mobile: yup
    .string()
    .required("Enter your phone number")
    .matches(/^\d{10}$/, "Phone number must be 10 digits"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("enter your email"),
  password: yup.string().required("enter your password"),
});

const initialValuesRegister = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  confirmPassword: "",
  place: "",
  occupation: "",
  picture: "",
  mobile: "",
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
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [profile, setProfile] = useState([]);
  const previousLocation = useSelector((state) => state.previousLocation);

  const Glogin = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    const fetchGoogleUserInfo = async () => {
      if (user) {
        try {
          const response = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
            {
              headers: {
                Authorization: `Bearer ${user.access_token}`,
                Accept: "application/json",
              },
            }
          );
          const googleUserInfo = response.data;
          const userData = {
            email: googleUserInfo.email,
            is_emailverified: googleUserInfo.verified_email,
            first_name: googleUserInfo.given_name,
            last_name: googleUserInfo.family_name,
            picture: googleUserInfo.picture,
          };

          try {
            const response = await publicInstance.post(
              "Googlelogin/",
              userData,
              {
                withCredentials: true,
              }
            );
            toast.success(`Welcome ${response.data.userInfo.first_name}`);
            const tokenString = JSON.stringify(response.data.token);
            const userInfo = response.data.userInfo;
            const pictureurl = response.data.picture_url;
            Cookies.set("Tokens", tokenString, { expires: 7 });
            Cookies.set("UserId", userInfo.id, { expires: 7 });
            dispatch(setCredentials({ userInfo, role: "USERS", pictureurl }));
            setTimeout(() => {
              navigate(previousLocation);
              dispatch(setLocation("/"));
            }, 1000);
          } catch (error) {
            if (error.response) {
              toast.error(error.response.data.detail);
            }
          }
        } catch (err) {
          console.log(err);
        }
      }
    };

    fetchGoogleUserInfo();
  }, [user]);

  // const GlogOut = () => {
  //   googleLogout();
  //   setProfile(null);
  // };

  const register = async (values, onSubmitProps) => {
    const formData = new FormData();

    for (let value in values) {
      formData.append(value, values[value]);
    }
    try {
      const response = await publicInstance.post("register/", formData);

      toast.success(response.data.message);
      toast(response.data.message_email, {
        icon: "📩",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      setPageType("login");
    } catch (error) {
      if (error.response) {
        if (error.response.data.mobile) {
          toast.error(error.response.data.mobile[0]);
        }
        if (error.response.data.email) {
          toast.error(error.response.data.email[0]);
        }
      }
      toast.error("Failed to register. Please try again.");
    }
  };

  const login = async (values, onSubmitProps) => {
    const userData = {
      email: values.email,
      password: values.password,
    };
    try {
      const response = await publicInstance.post("login/", userData, {
        withCredentials: true,
      });
      toast.success(`Welcome ${response.data.userInfo.first_name}`, {
        duration: 2000,
      });
      const tokenString = JSON.stringify(response.data.token);
      const userInfo = response.data.userInfo;
      const pictureurl = response.data.picture_url;

      if (userInfo.is_superuser) {
        Cookies.set("AdminTokens", tokenString, { expires: 7 });
        dispatch(setCredentials({ userInfo, role: "ADMIN" }));
        navigate("/admin/login");
      } else {
        Cookies.set("Tokens", tokenString, { expires: 7 });
        Cookies.set("UserId", userInfo.id, { expires: 7 });
        dispatch(setCredentials({ userInfo, role: "USERS" }));
        setTimeout(() => {
          navigate(previousLocation);
          dispatch(setLocation("/"));
        }, 1000);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.detail);
      }
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValuesRegister}
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
          setValues,
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
                    // color="rgba(33, 150, 243, 1.0)"
                  >
                    Sign in
                  </Typography>
                  <Typography
                    fontWeight="500"
                    variant="h5"
                    sx={{ gridColumn: "span 4" }}
                  >
                    Welcome to FLE , every FLE tells a story. What's yours?
                  </Typography>
                </>
              )}

              {isRegister && (
                <>
                  <Typography
                    fontWeight="bold"
                    sx={{ gridColumn: "span 4" }}
                    fontSize="32px"
                    color="rgba(33, 150, 243, 1.0)"
                  >
                    Sign up
                  </Typography>
                  <Typography
                    fontWeight="500"
                    variant="h5"
                    sx={{ gridColumn: "span 4" }}
                  >
                    Welcome to FLE , every FLE tells a story. What's yours?
                  </Typography>
                  <TextField
                    label="First Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.first_name}
                    name="first_name"
                    error={
                      Boolean(touched.first_name) && Boolean(errors.first_name)
                    }
                    helperText={touched.first_name && errors.first_name}
                    sx={{ gridColumn: "span 2" }}
                  />

                  <TextField
                    label="Last Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.last_name}
                    name="last_name"
                    error={
                      Boolean(touched.last_name) && Boolean(errors.last_name)
                    }
                    helperText={touched.last_name && errors.last_name}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    label="place"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.place}
                    name="place"
                    error={Boolean(touched.place) && Boolean(errors.place)}
                    helperText={touched.place && errors.place}
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
                              Drag 'n' drop your picture here, or click to
                              select
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

                  <TextField
                    label="phone Number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.mobile}
                    name="mobile"
                    error={Boolean(touched.mobile) && Boolean(errors.mobile)}
                    helperText={touched.mobile && errors.mobile}
                    sx={{ gridColumn: "span 4" }}
                  />
                </>
              )}

              {/* <Toaster position="top-right" reverseOrder={false} /> */}

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

            {/*Button*/}
            <Box>
              <Button
                fullWidth
                type="submit"
                sx={{
                  m: "0.5rem 0",
                  p: "0.5rem",
                  backgroundColor: palette.primary.main,
                  color: "ButtonHighlight",
                  "&:hover": {
                    color: palette.primary.main,
                    backgroundColor: "Highlight",
                  },
                  fontSize: "15px",
                }}
              >
                {isLogin ? "LOGIN" : "REGISTER"}
              </Button>

              <Button
                onClick={() => Glogin()}
                fullWidth
                sx={{
                  backgroundColor: "#FFFFFF",
                  color: "#000000",
                  "&:hover": {
                    backgroundColor: "Highlight",
                    color: "#000000",
                  },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  padding: "0.3rem",
                }}
              >
                <FcGoogle style={{ fontSize: "2em" }} />
                Sign in with Google
              </Button>
              <br />
              <Typography
                onClick={() => {
                  setPageType(isLogin ? "register" : "login");
                  if (isLogin) {
                    setValues(initialValuesRegister);
                  } else {
                    setValues(initialValuesLogin);
                  }

                  resetForm();
                }}
                sx={{
                  textDecoration: "underline",
                  color: palette.primary.main,
                  "&:hover": {
                    cursor: "pointer",
                    color: palette.primary.dark,
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
    </>
  );
};

export default Form;
