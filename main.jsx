import React from "react";
import { createRoot } from "react-dom/client";
import App from "./khadlaj-perfumes (1).jsx";

const rootEl = document.getElementById("root");

if (!rootEl) {
  throw new Error("Missing #root element");
}

createRoot(rootEl).render(<App />);

window.hidePreloader = () => {
  const preloader = document.getElementById('preloader');
  if (preloader && !preloader.classList.contains('loaded')) {
    preloader.classList.add('loaded');
    setTimeout(() => preloader.remove(), 400);
  }
};
// Hide preloader immediately so website opens instantly
if (document.readyState === 'complete') {
  window.hidePreloader();
} else {
  window.addEventListener('load', window.hidePreloader);
  setTimeout(window.hidePreloader, 100);
}
