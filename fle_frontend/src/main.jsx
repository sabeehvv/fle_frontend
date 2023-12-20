import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App.jsx";
import "./index.css";
import { store, persistor } from "../src/redux_toolkit/store";

import { GoogleOAuthProvider } from "@react-oauth/google";

import { initializeApp } from "firebase/app";
import { getMessaging ,getToken } from "firebase/messaging";
import axiosInstance from "../src/components/Axios/Axios.jsx";

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

getToken(messaging)
  .then((currentToken) => {
    if (currentToken) {

      try {
        axiosInstance.post(
          "notification/fcmToken/",
          {"token":currentToken}
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("No registration token available.");
    }
  })
  .catch((err) => {
    console.log("An error occurred while retrieving token. ", err);
  });

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="537676083596-ko7h55snf7gf8o0hm6olgtun9o3qbcu8.apps.googleusercontent.com">
    <React.StrictMode>
      <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <App />
            </PersistGate>
      </Provider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
