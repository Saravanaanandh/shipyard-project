import mongoose from "mongoose";

const tenderSchema = new mongoose.Schema(
  {
    tenderName: { type: String, required: true },
    description: { type: String, required: true },
    deadline: { type: Date, required: true },
    bidAmountRange: { type: String, required: true },
    tenderDocuments: [{ type: String }], // Store file URLs
  },
  { timestamps: true }
);

const Tender = mongoose.model("Tender", tenderSchema);
export default Tender;