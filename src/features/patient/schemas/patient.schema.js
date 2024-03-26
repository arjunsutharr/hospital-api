import mongoose from "mongoose";

// Patinet schema
const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Patient name is required."],
  },
  mobile: {
    type: String,
    required: [true, "Mobile number is required."],
    unique: true,
    validate: (mobile) => {
      const mobileRegex = /^\d{10}$/;
      return mobileRegex.test(mobile);
    },
    message: (props) => `${props.value} is not a valid mobile number.`,
  },
  age: {
    type: Number,
    required: [true, "Patient age is required."],
  },
  reports: [
    {
      report: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "report",
      },
    },
  ],
  populatedReports: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "report",
    get: function () {
      return this.reports.map((report) => report.report);
    },
  },
});

export const PatientModel = mongoose.model("patient", patientSchema);
