import React from "react";
import ReactDOM from "react-dom/client";
import { UserContextProvider } from "./providers/user";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserContextProvider>
    <App />
  </UserContextProvider>
);
  // <React.StrictMode>
  // </React.StrictMode>
