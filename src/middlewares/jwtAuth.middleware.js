import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandler.js";
import { DoctorModel } from "../features/doctor/doctor.schema.js";

// jwt token verifying middleware
export const jwtAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return next(new ErrorHandler(401, "login to access this route!"));
    }

    const decodeData = await jwt.verify(token, process.env.JWT_SECRET);

    const doctor = await DoctorModel.findById(decodeData.doctorId);

    if (!doctor) {
      return next(new ErrorHandler(403, "Doctor not found. please register."));
    }

    req.doctorId = doctor._id;
    next();
  } catch (error) {
    return next(new ErrorHandler(500, "Error while token verification"));
  }
};
