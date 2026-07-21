import React from "react";
import { createRoot } from "react-dom/client";
import App from "./khadlaj-perfumes (1).jsx";

const rootEl = document.getElementById("root");

if (!rootEl) {
  throw new Error("Missing #root element");
}

createRoot(rootEl).render(<App />);

// Hide preloader quickly after app renders (max 1 second delay)
setTimeout(() => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.classList.add('loaded');
    setTimeout(() => preloader.remove(), 1000); // remove from DOM after slide out
  }
}, 1000);
