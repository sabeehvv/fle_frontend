import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { baseUrl } from "../utils/constants";

const initialState = {
  mode: "light",
  profilePicture: "",
  previousLocation: "",
  user: null,
  token: null,
  userInfo: {
    email: null,
  },
  AdminInfo: {
    admin: null,
  },
  UserProfile: {
    email: null,
  },
};

export const valueSlice = createSlice({
  name: "value",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setCredentials: (state, action) => {
      console.log(action.payload.role, "Role ");
      if (action.payload.role == "ADMIN") {
        state.AdminInfo = action.payload.userInfo;
      } else {
        state.userInfo = action.payload.userInfo;
      }
    },

    setProfile: (state, action) => {
      state.UserProfile = action.payload;
    },

    setpicture: (state, action) => {
      state.profilePicture = baseUrl + action.payload;
    },
    logout: (state, action) => {
      // Reset state to initial value
      console.log(action.payload.role, "Role      llllllllll");
      Cookies.remove("UserId");
      if (action.payload.role == "ADMIN") {
        state.AdminInfo = { admin: null };
        Cookies.remove("AdminTokens");
      } else {
        state.userInfo = { name: null };
        state.profilePicture = "";
        Cookies.remove("Tokens");
        state.UserProfile = { profile: null };
      }
    },
    setLocation: (state, action) => {
      state.previousLocation = action.payload;
    },
  },
});

export const {
  setMode,
  setLogin,
  setCredentials,
  setpicture,
  logout,
  setProfile,
  setLocation,
} = valueSlice.actions;
export default valueSlice.reducer;
