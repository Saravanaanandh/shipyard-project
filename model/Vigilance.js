import mongoose from "mongoose";

const vigilanceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "Anonymous",
    },
    contact: {
      type: String,
      default: "Not Provided",
    },
    complaintType: {
      type: String,
      required: true,
      enum: ["Fraud", "Corruption", "Safety Violation", "Harassment"],
    },
    description: {
      type: String,
      required: true,
    },
    evidenceFile: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Pending", "Under Review", "Resolved"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Vigilance = mongoose.model("Vigilance", vigilanceSchema);
export default Vigilance;
