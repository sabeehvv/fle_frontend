import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";
import NavBar from '../NavBar/NavBar'

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreen = useMediaQuery("(min-width:1000px)");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",

        alignItems: "center",
        // backgroundImage: `url(https://res.cloudinary.com/dloscr748/image/upload/v1691654692/cld-sample-2.jpg)`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
<NavBar/>
      <Box
        width={isNonMobileScreen ? "50%" : "93%"}
        p="2rem"
        m="8rem auto"
        borderRadius="1.5rem"
        sx={{
          backgroundColor: "transparent",
          backdropFilter: "blur(60px)",
        }}
      >
        
        <Form />
        
      </Box>
    </Box>
  );
};

export default LoginPage;
