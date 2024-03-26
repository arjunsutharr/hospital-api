import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ErrorHandler from "../../utils/errorHandler.js";

// Doctor data schema
const doctorSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is required."],
  },
  password: {
    type: String,
    required: [true, "Password is required."],
  },
});

// Hashing the password before saving to database
doctorSchema.pre("save", async function (next) {
  try {
    this.password = await bcrypt.hash(this.password, 12);
    next();
  } catch (error) {
    return next(new ErrorHandler(500, "Error while hashing the password."));
  }
});

// Method for comparing password
doctorSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new ErrorHandler(500, "Error while verifying password.");
  }
};

// Method for generating jwt token
doctorSchema.methods.getJWTToken = function () {
  return jwt.sign({ doctorId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

export const DoctorModel = mongoose.model("doctor", doctorSchema);
