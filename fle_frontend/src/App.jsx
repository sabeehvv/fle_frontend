import Form from "./pages/loginpage/Form";
import VerifyEmail from "./components/EmailVerify/VerifyEmail";
import PageNotFound from "./components/PageNotFound/PageNotFound";

import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/loginpage";
import Home from "./pages/HomePage/Homepage";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Googletest from "./pages/HomePage/Googletest";
import { Toaster } from "react-hot-toast";
import AdminUser from "./pages/AdminPage/AdminUser";
import UserProfileUpdate from "./pages/UserProfile/UserProfile";
import CreateEventPage from "./pages/Events/CreateEvents";
import CreateEventMain from "./pages/Events/index";
import AdminEventListPage from "./pages/AdminPage/EventList";
import EventsPage from "./pages/EventList/EventsIndex";
import EventDetails from "./pages/EventDetailPage/EventDetail";
import EventDetail from "./pages/EventDetailPage/EventDetailsIndex";
import ContributionPage from "./pages/contribution/contribution";
import AdminAuth from "../src/components/PrivateRout/AdminAuth";
import AdminUnAuth from "../src/components/PrivateRout/AdminUnAuth";
import AdminHome from "./pages/AdminPage/AdminHome";
import AuthRequire from "./components/PrivateRout/AuthRequire";
import UnAuth from "./components/PrivateRout/UnAuth";
import ContributionList from "./pages/Contribution_list/ContributionList";
import BannerDashboard from "./pages/AdminPage/Banners/BannerDashboard";

function App() {
  const mode = useSelector((state) => state.mode);
  console.log(mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            {/* USER START */}
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/verify-email/:token/" element={<VerifyEmail />} />
            <Route path="/helloTesting" element={<ContributionList />} />

            <Route element={<AuthRequire />}>
              <Route path="/accounts/profile/" element={<Googletest />} />
              <Route path="/createEvent/" element={<CreateEventMain />} />
              <Route path="/profile" element={<UserProfileUpdate />} />
              <Route
                path="/events/contribution/:event_id/"
                element={<ContributionPage />}
              />
              <Route
                path="/events/eventdetail/:event_id/"
                element={<EventDetail />}
              />
            </Route>

            <Route element={<UnAuth />}>
              <Route path="/login" element={<LoginPage />} />
            </Route>

            {/* USER END */}

            <Route path="*" element={<PageNotFound />} />

            {/* ADMIN START */}

            <Route path="/admin">
              <Route element={<AdminUnAuth />}>
                <Route path="login" element={<LoginPage />} />
              </Route>
              <Route element={<AdminAuth />}>
                <Route path="" element={<AdminHome />} />
                <Route path="userlist" element={<AdminUser />} />
                <Route path="eventlist" element={<AdminEventListPage />} />
                <Route path="banners" element={<BannerDashboard />} />
              </Route>
            </Route>
            {/* ADMIN END */}
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
