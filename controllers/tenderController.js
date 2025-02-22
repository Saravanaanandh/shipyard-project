import Tender from "../model/Tender.js";
import Bid from "../model/Bid.js";
 
export const getTenders = async (req, res) => {
  try {
    const tenders = await Tender.find();
    res.status(200).json(tenders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tenders", error });
  }
};
 
export const createTender = async (req, res) => {
  try {
    const { tenderName, description, deadline, bidAmountRange } = req.body;
    const tenderDocuments = req.files.map((file) => file.path);

    const newTender = new Tender({
      tenderName,
      description,
      deadline,
      bidAmountRange,
      tenderDocuments,
    });

    await newTender.save();
    res.status(201).json({ message: "Tender created successfully", newTender });
  } catch (error) {
    res.status(500).json({ message: "Error creating tender", error });
  }
};
 
export const submitBid = async (req, res) => {
  try {
    const { bidderName, contact, bidAmount } = req.body;
    const proposalDocuments = req.files.map((file) => file.path);
    const tenderId = req.params.tenderId;

    const bid = new Bid({
      tenderId,
      bidderName,
      contact,
      bidAmount,
      proposalDocuments,
    });

    await bid.save();
    res.status(201).json({ message: "Bid submitted successfully", bid });
  } catch (error) {
    res.status(500).json({ message: "Error submitting bid", error });
  }
};
