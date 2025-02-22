import express from "express";
import { reportIssue, getAllReports, getReportById, updateReportStatus } from "../controllers/vigilanceController.js";
import upload from "../middlewares/uploadMiddleware.js"; // For file handling

const router = express.Router();
 
router.post("/report", upload.single("evidence"), reportIssue);
 
router.get("/reports", getAllReports);
 
router.get("/report/:id", getReportById);
 
router.put("/report/:id/status", updateReportStatus);

export default router;
