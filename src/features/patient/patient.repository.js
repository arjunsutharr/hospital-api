import mongoose from "mongoose";
import { PatientModel } from "./schemas/patient.schema.js";
import ErrorHandler from "../../utils/errorHandler.js";
import { PatientReportModel } from "./schemas/patientReports.schema.js";

export default class PatientRepository {
  // Add new patient
  async register(name, age, mobile) {
    try {
      return await new PatientModel({ name, age, mobile }).save();
    } catch (error) {
      if (error instanceof mongoose.Error) {
        if (error.errors.mobile) {
          throw new ErrorHandler(400, "Please provide valid mobile number");
        } else {
          throw new ErrorHandler(400, error);
        }
      } else {
        throw error;
      }
    }
  }

  // Create new report
  async createReport(patientId, doctorId, status) {
    try {
      const statusLowerCase = status.toLowerCase();

      return await new PatientReportModel({
        patient: patientId,
        createdBy: doctorId,
        status: statusLowerCase,
      }).save();
    } catch (error) {
      if (error instanceof mongoose.Error) {
        if (error.errors.mobile) {
          throw new ErrorHandler(400, "Please provide valid mobile number");
        } else {
          throw new ErrorHandler(400, error);
        }
      } else {
        throw error;
      }
    }
  }

  // Get single report
  async getReport(reportId) {
    try {
      const report = await PatientReportModel.findById(reportId).populate({
        path: "createdBy",
      });

      return report;
    } catch (error) {
      if (error instanceof mongoose.Error) {
        throw new ErrorHandler(400, error);
      } else {
        throw error;
      }
    }
  }

  // Get all reports of a patient
  async allReports(patientId) {
    try {
      const foundPatient = await PatientReportModel.find({
        patient: patientId,
      })
        .select({ createdBy: 1, status: 1, date: 1 })
        .populate({
          path: "createdBy",
          select: "username",
        });

      if (!foundPatient) {
        throw new ErrorHandler(404, "No patient found with this id.");
      }

      return foundPatient;
    } catch (error) {
      if (error instanceof mongoose.Error) {
        throw new ErrorHandler(400, error);
      } else {
        throw error;
      }
    }
  }

  // Get filtered reports
  async filteredReports(status) {
    try {
      const statusLowerCase = status.toLowerCase();
      const reports = await PatientReportModel.find({
        status: statusLowerCase,
      });
      if (reports.length === 0) {
        throw new ErrorHandler(404, "No reports found");
      }

      return reports;
    } catch (error) {
      if (error instanceof mongoose.Error) {
        throw new ErrorHandler(400, error);
      } else {
        throw error;
      }
    }
  }
}
