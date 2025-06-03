import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import morgan from "morgan";
import cookieParser from 'cookie-parser';
import bodyParser from "body-parser";

import AppError from "./utils/appError.js";
import globalErrorHandler from "./utils/globalErrorHandler.js";


// Import routes
import Hospital from "./routes/hospital.js";
import Drug from "./routes/drug.js";
import Disease from "./routes/disease.js";
import Patient from "./routes/patient.js";
import Staff from "./routes/staff.js";
import Test from "./routes/test.js";
import Payment from "./routes/payment.js";
import Visit from "./routes/visit.js";
import auth from "./routes/auth.js";

import { config } from "./config/config.js";

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception! Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

const app = express();

if (config.ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectDB();

const base_url = '/api/hms';

app.use(base_url, Hospital);
app.use(base_url, Drug);
app.use(base_url, Disease);
app.use(base_url, Patient);
app.use(base_url, Staff);
app.use(base_url, Test);
app.use(base_url, Payment);
app.use(base_url, Visit);
app.use(base_url, auth);

app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

const port = config.PORT || 5000;

const server = app.listen(port, () => {
  console.log(`Server is running on ${port} in ${config.ENV} mode`);
});

process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection! Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

