import express from "express";
import protect from "../middlewares/authMiddleware.js";
import {
  enhanceJobDescription,
  enhanceProfessionalSummary,
  uploadResume,
  generateCoverLetter,
  enhanceCoverLetter,
} from "../controllers/aiController.js";


const aiRouter = express.Router();

aiRouter.post("/enhance-pro-sum", protect, enhanceProfessionalSummary);
aiRouter.post("/enhance-job-desc", protect, enhanceJobDescription);
aiRouter.post("/upload-resume", protect, uploadResume);
aiRouter.post("/generate-cover-letter", protect, generateCoverLetter);
aiRouter.post("/enhance-cover-letter", protect, enhanceCoverLetter);

export default aiRouter;
