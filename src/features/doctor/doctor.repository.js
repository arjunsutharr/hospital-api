import mongoose from "mongoose";
import { DoctorModel } from "./doctor.schema.js";
import ErrorHandler from "../../utils/errorHandler.js";

export default class DoctorRepository {
  // Register new doctor
  async register(doctor) {
    try {
      return await new DoctorModel(doctor).save();
    } catch (error) {
      if (error instanceof mongoose.Error) {
        throw new ErrorHandler(400, error);
      } else if (error.name === "MongoServerError" && error.code === 11000) {
        throw new ErrorHandler(401, "Doctor already exists with username.");
      } else {
        throw error;
      }
    }
  }

  // Login doctor
  async login(username, password) {
    try {
      const doctor = await DoctorModel.findOne({ username: username });
      if (!doctor) {
        throw new ErrorHandler(404, "No Doctor found with this username.");
      }

      const passwordMatch = await doctor.comparePassword(password);

      if (!passwordMatch) {
        throw new ErrorHandler(401, "Invalid password");
      }

      const token = doctor.getJWTToken();
      return token;
    } catch (error) {
      if (error instanceof mongoose.Error) {
        throw new ErrorHandler(400, error);
      } else if (error.name === "MongoServerError" && error.code === 11000) {
        throw new ErrorHandler(401, "Doctor already exists with username.");
      } else {
        throw error;
      }
    }
  }
}
