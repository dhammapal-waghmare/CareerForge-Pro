import express from "express";
import protect from "../middlewares/authMiddleware.js";
import {
  createCoverLetter,
  deleteCoverLetter,
  getCoverLetterById,
  updateCoverLetter,
  getAllCoverLetters,
} from "../controllers/coverLetterController.js";

const coverLetterRouter = express.Router();

coverLetterRouter.post("/create", protect, createCoverLetter);
coverLetterRouter.get("/all", protect, getAllCoverLetters);
coverLetterRouter.put("/update/:coverLetterId", protect, updateCoverLetter);
coverLetterRouter.delete("/delete/:coverLetterId", protect, deleteCoverLetter);
coverLetterRouter.get("/get/:coverLetterId", protect, getCoverLetterById);

export default coverLetterRouter;
