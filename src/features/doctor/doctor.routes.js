import express from "express";
import DoctorController from "./doctor.controller.js";

const router = express.Router();

const doctorController = new DoctorController();

// Doctor registration route
router.post("/register", (req, res, next) => {
  doctorController.registerDoctor(req, res, next);
});

// Doctor login route
router.post("/login", (req, res, next) => {
  doctorController.loginDoctor(req, res, next);
});

// Doctor logout route
router.post("/logout", (req, res, next) => {
  doctorController.logoutDoctor(req, res, next);
});

export default router;
