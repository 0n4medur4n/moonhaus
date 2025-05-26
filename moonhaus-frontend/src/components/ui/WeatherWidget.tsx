import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface WeatherData {
  current_condition: [
    {
      temp_C: string;
      weatherDesc: [
        {
          value: string;
        }
      ];
      weatherCode: string;
      windspeedKmph: string;
    }
  ];
}

const WeatherWidget: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { i18n } = useTranslation();

  const getWeatherIcon = (weatherCode: string): string => {
    const iconMap: Record<string, string> = {
      "113": "☀️",
      "116": "🌤️",
      "119": "☁️",
      "122": "☁️",
      "143": "🌫️",
      "176": "🌦️",
      "179": "🌨️",
      "182": "🌧️",
      "185": "🌧️",
      "200": "⛈️",
      "227": "❄️",
      "230": "❄️",
      "248": "🌫️",
      "260": "🌫️",
      "263": "🌦️",
      "266": "🌧️",
      "281": "🌧️",
      "284": "🌧️",
      "293": "🌦️",
      "296": "🌧️",
      "299": "🌧️",
      "302": "🌧️",
      "305": "🌧️",
      "308": "🌧️",
      "311": "🌧️",
      "314": "🌧️",
      "317": "🌧️",
      "320": "🌧️",
      "323": "🌨️",
      "326": "❄️",
      "329": "❄️",
      "332": "❄️",
      "335": "❄️",
      "338": "❄️",
      "350": "🧊",
      "353": "🌦️",
      "356": "🌧️",
      "359": "🌧️",
      "362": "🌧️",
      "365": "🌧️",
      "368": "🌨️",
      "371": "❄️",
      "374": "🧊",
      "377": "🧊",
      "386": "⛈️",
      "389": "⛈️",
      "392": "⛈️",
      "395": "⛈️",
    };
    return iconMap[weatherCode] || "🌡️";
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);

        const city = "Valencia,Spain";

        const url = `https://wttr.in/${city}?format=j1`;

        console.log("Weather API URL:", url);

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        console.log("Weather API Response:", data);
        setWeatherData(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching weather data:", err);
        setError("Error clima");
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();

    const intervalId = setInterval(fetchWeatherData, 30 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [i18n.language]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="weather-widget"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "4px 10px",
        borderRadius: "8px",
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(5px)",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        margin: "0 10px",
        height: "32px",
      }}
    >
      {loading ? (
        <span style={{ fontSize: "14px", color: "#FFFFFF" }}>Cargando...</span>
      ) : error ? (
        <span style={{ fontSize: "14px", color: "#FFFFFF" }}>🌡️ {error}</span>
      ) : weatherData ? (
        <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
          <span style={{ fontSize: "16px" }}>
            {getWeatherIcon(weatherData.current_condition[0].weatherCode)}
          </span>
          <span style={{ fontSize: "14px", color: "#FFFFFF", fontWeight: 500 }}>
            {weatherData.current_condition[0].temp_C}°C
          </span>
          <span
            style={{
              fontSize: "14px",
              color: "#FFFFFF",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            Valencia <span style={{ fontSize: "16px" }}>🇪🇸</span>
          </span>
        </div>
      ) : (
        <span style={{ fontSize: "14px", color: "#FFFFFF" }}>Cargando...</span>
      )}
    </motion.div>
  );
};

export default WeatherWidget;
