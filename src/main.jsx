import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "maplibre-gl/dist/maplibre-gl.css";
import "./index.css";

const redirectPath = sessionStorage.getItem("redirect");
if (redirectPath) {
  sessionStorage.removeItem("redirect");

  const normalizedPath = redirectPath.startsWith("/")
    ? redirectPath
    : `/${redirectPath}`;

  const resolvedUrl = new URL(normalizedPath, window.location.origin);
  window.history.replaceState(null, "", `${resolvedUrl.pathname}${resolvedUrl.search}${resolvedUrl.hash}`);
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
