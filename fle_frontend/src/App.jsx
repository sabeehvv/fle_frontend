import VerifyEmail from "./components/EmailVerify/VerifyEmail";
import PageNotFound from "./components/PageNotFound/PageNotFound";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/loginpage/index.jsx";
import Home from "./pages/HomePage/Homepage.jsx";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Toaster } from "react-hot-toast";
import AdminUser from "./pages/AdminPage/AdminUser.jsx";
import UserProfileUpdate from "./pages/UserProfile/UserProfile.jsx";
import CreateEventMain from "./pages/Events/index.jsx";
import AdminEventListPage from "./pages/AdminPage/EventList/EventList.jsx";
import EventsPage from "./pages/EventList/EventsIndex.jsx";
import EventDetail from "./pages/EventDetailPage/EventDetailsIndex.jsx";
import ContributionPage from "./pages/contribution/Contribution.jsx";
import AdminAuth from "../src/components/PrivateRout/AdminAuth.jsx";
import AdminUnAuth from "../src/components/PrivateRout/AdminUnAuth.jsx";
import AdminHome from "./pages/AdminPage/AdminHome.jsx";
import AuthRequire from "./components/PrivateRout/AuthRequire.jsx";
import UnAuth from "./components/PrivateRout/UnAuth.jsx";
import ContributionList from "./pages/Contribution_list/ContributionList.jsx";
import BannerDashboard from "./pages/AdminPage/Banners/BannerDashboard.jsx";
import EditEventIndex from "./pages/EditEvent/index.jsx";
import VolunteerList from "./pages/volunteers/volunteers.jsx";

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
            <Route path="/Contributors" element={<ContributionList />} />
            <Route path="/volunteers" element={<VolunteerList />} />

            <Route element={<AuthRequire />}>
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
              <Route
                path="/events/edit/:event_id/"
                element={<EditEventIndex />}
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
