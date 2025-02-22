import mongoose from "mongoose";

const bidSchema = new mongoose.Schema(
  {
    tenderId: { type: mongoose.Schema.Types.ObjectId, ref: "Tender", required: true },
    bidderName: { type: String, required: true },
    contact: { type: String, required: true },
    bidAmount: { type: Number, required: true },
    proposalDocuments: [{ type: String }], // Store uploaded files
  },
  { timestamps: true }
);

const Bid = mongoose.model("Bid", bidSchema);
export default Bid;
