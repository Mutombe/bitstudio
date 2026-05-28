import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import App from "./App.jsx";
import "./index.css";

// Self-hosted fonts (was: dynamic <link> to fonts.googleapis.com).
// Removes the LG München I 3 O 17493/20 grey zone. DSGVO clean.
// Syne (display headings), Space Grotesk (body), Fraunces (italic accent),
// JetBrains Mono (mono/labels). Weights match what the design system uses.
import "@fontsource/syne/400.css";
import "@fontsource/syne/500.css";
import "@fontsource/syne/600.css";
import "@fontsource/syne/700.css";
import "@fontsource/syne/800.css";
import "@fontsource/space-grotesk/300.css";
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import "@fontsource-variable/fraunces/standard.css";
import "@fontsource-variable/fraunces/standard-italic.css";
import "@fontsource/jetbrains-mono/300.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/600.css";

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
