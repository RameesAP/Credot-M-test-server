import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// import routers
import userRoutes from "./routes/user_routes.js";
import authRoutes from "./routes/auth_routes.js";
import productRoutes from "./routes/product_routes.js";
import cartRoutes from "./routes/cart_routes.js";

// use of routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);

// middleware
app.use(cors({
  origin: "https://credotrameess.netlify.app",
  credentials: true,
}));

app.use((error, req, res, next) => {
  statusCode = error.statusCode || 500;
  const message = error.message || "internal server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// DB Connect
mongoose
  .connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB !!!");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

app.listen(process.env.PORT, () => {
  console.log("Server is running on port 5000");
});
