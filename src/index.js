import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

// ✅ Proper dirname resolution
const __dirname = path.resolve();

// ✅ Middlewares
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "https://tunichatt.onrender.com", // frontend URL
    ],
    credentials: true,
  })
);

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// ✅ Production setup (serve frontend)
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../frontend/dist");

  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

// ✅ Start server
server.listen(PORT, () => {
  console.log("🚀 Server running on PORT:", PORT);
  connectDB();
});