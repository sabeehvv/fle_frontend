import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App.jsx";
import "./index.css";
import { store, persistor } from "../src/redux_toolkit/store";
import { DarkmodeContextProvider } from "./context/DarkmodeContext.jsx";

import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="537676083596-ko7h55snf7gf8o0hm6olgtun9o3qbcu8.apps.googleusercontent.com">
    <React.StrictMode>
      <Provider store={store}>
          <DarkmodeContextProvider>
            <PersistGate loading={null} persistor={persistor}>
              <App />
            </PersistGate>
          </DarkmodeContextProvider>
      </Provider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
