import express from "express";
import multer from "multer";
import { getTenders, createTender, submitBid } from "../controllers/tenderController.js";

const router = express.Router();
 
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });
 
router.get("/", getTenders); 
router.post("/create", upload.array("tenderDocuments", 5), createTender); // Create new tender
router.post("/apply/:tenderId", upload.array("proposalDocuments", 5), submitBid); // Submit bid

export default router;
