import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./i18n/i18n";

// Componente de carga mientras se cargan las traducciones
const Loading = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background:
        "linear-gradient(135deg, rgb(20, 5, 35) 0%, rgb(45, 25, 70) 50%, rgb(30, 15, 50) 100%)",
      color: "white",
      fontSize: "1.2rem",
      fontWeight: "300",
      letterSpacing: "0.2rem",
    }}
  >
    MOONHAUS
  </div>
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Suspense fallback={<Loading />}>
      <App />
    </Suspense>
  </React.StrictMode>
);
