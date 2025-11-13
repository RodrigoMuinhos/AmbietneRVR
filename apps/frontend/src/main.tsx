import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import "./pwa";
import { PatientsProvider } from "./context/PatientsContext";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <PatientsProvider>
        <App />
      </PatientsProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
