import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import App from "./App.jsx";
import "./index.css";

// If we arrived from the 404.html shim (strict static host serving 404 for
// deep routes), restore the original path so the SPA router can mount it.
try {
  const stashed = sessionStorage.getItem("bit:spa-redirect");
  if (stashed) {
    sessionStorage.removeItem("bit:spa-redirect");
    if (stashed !== window.location.pathname + window.location.search + window.location.hash) {
      window.history.replaceState(null, "", stashed);
    }
  }
} catch (_) {}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#0A0708",
            color: "#F5EFE6",
            border: "1px solid #4F0D18",
            borderRadius: "2px",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "12px",
            letterSpacing: "0.08em",
          },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>
);
