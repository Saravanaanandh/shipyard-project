import Vigilance from "../model/Vigilance.js";


export const reportIssue = async (req, res) => {
  try {
    const { name, contact, complaintType, description } = req.body;
    const evidenceFile = req.file ? req.file.path : null; // Uploaded file URL

    const newComplaint = new Vigilance({
      name: name || "Anonymous",
      contact: contact || "Not Provided",
      complaintType,
      description,
      evidenceFile,
    });

    await newComplaint.save();
    res.status(201).json({ message: "Complaint submitted successfully", complaint: newComplaint });
  } catch (error) {
    res.status(500).json({ message: "Error submitting complaint", error: error.message });
  }
};


export const getAllReports = async (req, res) => {
  try {
    const reports = await Vigilance.find().sort({ createdAt: -1 });
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: "Error fetching complaints", error: error.message });
  }
};


export const getReportById = async (req, res) => {
  try {
    const report = await Vigilance.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ message: "Complaint not found" });
    }
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: "Error fetching complaint", error: error.message });
  }
};


export const updateReportStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const report = await Vigilance.findById(req.params.id);

    if (!report) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    report.status = status;
    await report.save();
    res.status(200).json({ message: "Status updated successfully", report });
  } catch (error) {
    res.status(500).json({ message: "Error updating status", error: error.message });
  }
};
