import express from "express";
import PatientController from "./patient.controller.js";
import { jwtAuth } from "../../middlewares/jwtAuth.middleware.js";

const router = express.Router();

const patientController = new PatientController();

// Register patient
router.post("/register", jwtAuth, (req, res, next) => {
  patientController.registerPatient(req, res, next);
});

// Create patient report
router.post("/:id/create_report", jwtAuth, (req, res, next) => {
  patientController.createPatientReport(req, res, next);
});

// Get single report of a patient
router.get("/:id/report", jwtAuth, (req, res, next) => {
  patientController.getPatientReport(req, res, next);
});

// Get all reports of a patient
router.get("/:id/all_reports", jwtAuth, (req, res, next) => {
  patientController.getPatientAllReports(req, res, next);
});

// Get filtered reports
router.get("/reports/:status", jwtAuth, (req, res, next) => {
  patientController.getFilteredReports(req, res, next);
});

export default router;
