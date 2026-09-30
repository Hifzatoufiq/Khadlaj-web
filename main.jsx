import React from "react";
import { createRoot } from "react-dom/client";
import App from "./khadlaj-perfumes (1).jsx";

window.hidePreloader = () => {
  try {
    const preloader = document.getElementById('preloader');
    if (preloader && !preloader.classList.contains('loaded')) {
      preloader.classList.add('loaded');
      setTimeout(() => {
        if (preloader && preloader.parentNode) {
          preloader.parentNode.removeChild(preloader);
        }
      }, 400);
    }
  } catch (e) {
    console.error("hidePreloader error:", e);
  }
};

// Ensure preloader is dismissed quickly
if (document.readyState === 'complete') {
  window.hidePreloader();
} else {
  window.addEventListener('load', window.hidePreloader);
  setTimeout(window.hidePreloader, 100);
  setTimeout(window.hidePreloader, 1000);
}

class RootErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("RootErrorBoundary caught error:", error, errorInfo);
    window.hidePreloader();
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "40px 20px", textAlign: "center", fontFamily: "sans-serif" }}>
          <h2>Something went wrong loading this view.</h2>
          <p style={{ color: "#888", fontSize: "14px" }}>Please refresh the page to reload Khadlaj Perfumes.</p>
          <button 
            onClick={() => window.location.reload()} 
            style={{ marginTop: "20px", padding: "10px 24px", background: "#251737", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
          >
            Reload Store
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

try {
  const rootEl = document.getElementById("root");
  if (!rootEl) {
    console.error("Missing #root element");
    window.hidePreloader();
  } else {
    const root = createRoot(rootEl);
    root.render(
      <RootErrorBoundary>
        <App />
      </RootErrorBoundary>
    );
  }
} catch (err) {
  console.error("Fatal error rendering app:", err);
  window.hidePreloader();
}
