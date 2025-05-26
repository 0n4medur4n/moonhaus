const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const contactRoutes = require("./routes/contact");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware de seguridad
app.use(helmet());
app.use(compression());

// Logging
app.use(morgan("combined"));

// CORS configuration
const corsOptions = {
  origin: [
    process.env.FRONTEND_URL || "http://localhost:5173",
    "https://moonhaus.es",
    "https://www.moonhaus.es",
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutos
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 5, // máximo 5 requests por ventana
  message: {
    error:
      "Demasiadas solicitudes desde esta IP, por favor intenta de nuevo más tarde.",
    retryAfter: "15 minutos",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Aplicar rate limiting solo a rutas de contacto
app.use("/api/contact", limiter);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    service: "Moonhaus Backend",
    version: "1.0.0",
  });
});

// API Routes
app.use("/api/contact", contactRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM signal received: closing HTTP server");
  server.close(() => {
    console.log("HTTP server closed");
  });
});

const server = app.listen(PORT, () => {
  console.log(`🚀 Moonhaus Backend running on port ${PORT}`);
  console.log(
    `📧 Email service: ${
      process.env.GMAIL_USER ? "Configured" : "Not configured"
    }`
  );
  console.log(
    `🔗 HubSpot: ${
      process.env.HUBSPOT_ACCESS_TOKEN ? "Configured" : "Not configured"
    }`
  );
  console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
});

module.exports = app;
