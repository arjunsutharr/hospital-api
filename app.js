import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import doctorRoutes from "./src/features/doctor/doctor.routes.js";
import patientRoutes from "./src/features/patient/patient.routes.js";
import connectToDb from "./src/config/db.js";
import { errorHandlerMiddleware } from "./src/middlewares/errorHandler.middleware.js";
import { invalidRouteHandlerMiddleware } from "./src/middlewares/invalidRoutesHandler.middleware.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

// configure routes
app.use("/api/patients", patientRoutes);
app.use("/api/doctors", doctorRoutes);

// Default route handler
app.get("/", (req, res) => {
  res.status(200).send("Welcome to Hospital Apis");
});

// Error handler middleware
app.use(errorHandlerMiddleware);

// Invalid routes handler middleware
app.use(invalidRouteHandlerMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
  connectToDb();
});
