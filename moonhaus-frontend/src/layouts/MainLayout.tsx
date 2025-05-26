import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WeatherWidget from "../components/ui/WeatherWidget";

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Widget del clima en la esquina superior derecha */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "20px",
          zIndex: 1000,
        }}
      >
        <WeatherWidget />
      </div>
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
