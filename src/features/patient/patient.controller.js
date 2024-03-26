import ErrorHandler from "../../utils/errorHandler.js";
import PatientRepository from "./patient.repository.js";
import { PatientModel } from "./schemas/patient.schema.js";

export default class PatientController {
  constructor() {
    this.patientRepository = new PatientRepository();
  }

  // Add new patient
  async registerPatient(req, res, next) {
    try {
      const { name, age, mobile } = req.body;

      if (!name || !age || !mobile) {
        return res.status(401).json({
          success: false,
          msg: "Name, Age and Mobile number is requried.",
        });
      }

      const patientExists = await PatientModel.findOne({ mobile });

      if (patientExists) {
        return res.status(200).json({ res: patientExists });
      }

      const patient = await this.patientRepository.register(
        name,
        Number(age),
        mobile
      );

      res.status(201).json({ success: true, res: patient });
    } catch (error) {
      next(error);
    }
  }

  // Create patient report
  async createPatientReport(req, res, next) {
    try {
      const patientId = req.params.id;
      const { doctorId } = req;
      const { status } = req.body;

      if (!patientId) {
        return res
          .status(401)
          .json({ success: false, msg: "Patient id is required." });
      }

      const foundPatient = await PatientModel.findById(patientId);
      if (!foundPatient) {
        throw new ErrorHandler(404, "No patient found with this id.");
      }

      const newReport = await this.patientRepository.createReport(
        patientId,
        doctorId,
        status
      );

      foundPatient.reports.push(newReport._id);

      await foundPatient.save();

      res.status(201).json({ success: true, res: newReport });
    } catch (error) {
      next(error);
    }
  }

  // Get single report of patient
  async getPatientReport(req, res, next) {
    try {
      const patientId = req.params.id;
      const report = await this.patientRepository.getReport(patientId);

      res.status(200).json({ success: true, res: report });
    } catch (error) {
      next(error);
    }
  }

  // Get all reports of a patient
  async getPatientAllReports(req, res, next) {
    try {
      const patientId = req.params.id;
      const allReports = await this.patientRepository.allReports(patientId);

      res.status(200).json({ success: true, res: allReports });
    } catch (error) {
      next(error);
    }
  }

  // get Filtered reports
  async getFilteredReports(req, res, next) {
    try {
      const { status } = req.params;
      if (!status) {
        return res
          .status(401)
          .json({ success: false, msg: "status is required." });
      }

      const filteredReports = await this.patientRepository.filteredReports(
        status
      );

      res.status(200).json({ success: true, res: filteredReports });
    } catch (error) {
      next(error);
    }
  }
}
