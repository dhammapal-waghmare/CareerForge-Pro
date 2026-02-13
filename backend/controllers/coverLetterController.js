import CoverLetter from "../models/CoverLetter.js";

// controller for creating a new cover letter
export const createCoverLetter = async (req, res) => {
  try {
    const userId = req.userId;
    const { title, jobName, jobDescription, content } = req.body;

    // validate required fields
    if (!title || !jobName || !jobDescription) {
      return res.status(400).json({ message: "Title, job name and description are required" });
    }

    // create new cover letter
    const newCoverLetter = await CoverLetter.create({ 
      userId,
      title, 
      jobName, 
      jobDescription,
      content: content || "" 
    });

    //return success response
    return res
      .status(201)
      .json({ 
        message: "Cover letter created successfully", 
        coverLetter: newCoverLetter 
      });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// controller for getting all cover letters for a user
export const getAllCoverLetters = async (req, res) => {
  try {
    const userId = req.userId;

    const coverLetters = await CoverLetter.find({ userId }).sort({ updatedAt: -1 });

    return res.status(200).json({ coverLetters });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// controller for deleting a cover letter
export const deleteCoverLetter = async (req, res) => {
  try {
    const userId = req.userId;
    const { coverLetterId } = req.params;

    const coverLetter = await CoverLetter.findOneAndDelete({ 
      userId, 
      _id: coverLetterId 
    });

    if (!coverLetter) {
      return res.status(404).json({ message: "Cover letter not found" });
    }

    //return success response
    return res.status(200).json({ message: "Cover letter deleted successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//get cover letter by id
export const getCoverLetterById = async (req, res) => {
  try {
    const userId = req.userId;
    const { coverLetterId } = req.params;

    const coverLetter = await CoverLetter.findOne({ 
      userId, 
      _id: coverLetterId 
    });

    if (!coverLetter) {
      return res.status(404).json({ message: "Cover letter not found" });
    }

    //return cover letter
    return res.status(200).json(coverLetter);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// controller for updating a cover letter
export const updateCoverLetter = async (req, res) => {
  try {
    const userId = req.userId;
    const { coverLetterId } = req.params;
    const updateData = req.body;

    const coverLetter = await CoverLetter.findOneAndUpdate(
      { userId, _id: coverLetterId },
      updateData,
      { new: true }
    );

    if (!coverLetter) {
      return res.status(404).json({ message: "Cover letter not found" });
    }

    //return success response
    return res.status(200).json({ 
      message: "Cover letter updated successfully", 
      coverLetter 
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
