import mongoose from "mongoose";

const CoverLetterSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    jobName: { type: String, required: true },
    jobDescription: { type: String, required: true },
    content: { type: String, default: "" },
  },
  { timestamps: true }
);

const CoverLetter = mongoose.model("CoverLetter", CoverLetterSchema);

export default CoverLetter;
