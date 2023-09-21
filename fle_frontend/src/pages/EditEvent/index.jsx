import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  AppBar,
  Toolbar,
  TextField,
} from "@mui/material";
import EditEventPage from "./EditEvent";
import NavBar from "../NavBar/NavBar";

const EditEventIndex = () => {
  const isNonMobileScreen = useMediaQuery("(min-width:1000px)");

  return (
    <>
      <AppBar style={{ backgroundColor: "RGB(255 106 0)" }}>
        <Toolbar></Toolbar>
      </AppBar>
      <NavBar />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",

          alignItems: "center",
          backgroundImage: `url(https://res.cloudinary.com/dloscr748/image/upload/v1693440727/inclusion-events_zrolaq.webp)`,
          backgroundSize: "100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundColor: "rgb(249,214,187)",
        }}
      >
        <Box
          width={isNonMobileScreen ? "50%" : "93%"}
          p="2rem"
          m="6rem auto"
          borderRadius="1.5rem"
          sx={{
            backgroundColor: "transparent",
            backdropFilter: "blur(80px)",
          }}
        >
          <EditEventPage />
        </Box>
      </Box>
    </>
  );
};

export default EditEventIndex;
