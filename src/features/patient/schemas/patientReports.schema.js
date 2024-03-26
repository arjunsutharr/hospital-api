import mongoose from "mongoose";

// Patient reports schema
const patientReportSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Patient Id is required."],
    ref: "patient",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Doctor Id is required."],
    ref: "doctor",
  },
  status: {
    type: String,
    enum: [
      "negative",
      "travelled-quarantine",
      "symptoms-quarantine",
      "positive-admit",
    ],
    required: [
      true,
      "Please select one of the options: Negative, Travelled-Quarantine, Symptoms-Quarantine, Positive-Admit",
    ],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Index for easy report search
patientReportSchema.index({ status: 1 });

export const PatientReportModel = mongoose.model("report", patientReportSchema);
