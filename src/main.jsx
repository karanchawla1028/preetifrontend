import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { HelmetProvider } from "react-helmet-async";
import { ToastProvider } from "./features/components/ToastProvider.jsx";

createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <ToastProvider>
      <App />
    </ToastProvider>
  </HelmetProvider>
);
