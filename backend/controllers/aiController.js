import ai from "../configs/ai.js";
import Resume from "../models/Resume.js";

//  Enhance professional summary using AI

export const enhanceProfessionalSummary = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an expert in resume writing. Your task is to enhance the professional summary of a resume. The summary should be one to two sentences highlighting key skills, experience, and career objectives. Make it compelling, ATS-friendly, and return only plain text with no options or explanations.",
        },
        {
          role: "user",
          content: userContent,
        },
      ],
    });

    const enhancedContent = response.choices[0].message.content;
    return res.status(200).json({ enhancedContent });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//  Enhance job description using AI

export const enhanceJobDescription = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an expert in resume writing. Your task is to enhance the job description of a resume. The job description should be one to two sentences highlighting key responsibilities and achievements. Use action verbs and quantifiable results where possible. Make it ATS-friendly and return only plain text.",
        },
        {
          role: "user",
          content: userContent,
        },
      ],
    });

    const enhancedContent = response.choices[0].message.content;
    return res.status(200).json({ enhancedContent });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Upload resume and extract structured data using AI

export const uploadResume = async (req, res) => {
  try {
    const { resumeText, title } = req.body;
    const userId = req.userId;

    if (!resumeText || !title) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const systemPrompt = `
You are an expert AI agent that extracts structured data from resumes.
Return ONLY valid JSON. Do not include explanations, comments, or markdown.

JSON format:
{
  "professional_summary": "",
  "skills": [],
  "personal_info": {
    "image": "",
    "full_name": "",
    "profession": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "website": ""
  },
  "experience": [
    {
      "company": "",
      "position": "",
      "start_date": "",
      "end_date": "",
      "description": "",
      "is_current": false
    }
  ],
  "project": [
    {
      "name": "",
      "type": "",
      "description": ""
    }
  ],
  "education": [
    {
      "institution": "",
      "degree": "",
      "field": "",
      "graduation_date": "",
      "gpa": ""
    }
  ]
}
`;

    const userPrompt = `Extract data from this resume:\n${resumeText}`;

    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
    });

    const parsedData = JSON.parse(response.choices[0].message.content);

    const newResume = await Resume.create({
      userId,
      title,
      ...parsedData,
    });

    return res.status(201).json({ resumeId: newResume._id });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Generate cover letter using AI

export const generateCoverLetter = async (req, res) => {
  try {
    const { jobName, jobDescription } = req.body;

    if (!jobName || !jobDescription) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an expert cover letter writer. Write a professional, compelling cover letter based on the job details provided. The cover letter should be well-structured with an introduction, body paragraphs highlighting relevant skills and experience, and a strong conclusion. Make it persuasive and tailored to the specific role. Format it as a professional letter with proper spacing.",
        },
        {
          role: "user",
          content: `Job Title: ${jobName}\n\nJob Description:\n${jobDescription}\n\nPlease write a professional cover letter for this position.`,
        },
      ],
    });

    const content = response.choices[0].message.content;
    return res.status(200).json({ content });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Enhance cover letter content using AI

export const enhanceCoverLetter = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an expert cover letter writer. Enhance and improve the provided cover letter content. Make it more professional, compelling, and impactful. Ensure proper grammar, strong action verbs, and persuasive language. Maintain the original structure but elevate the quality. Return only the enhanced cover letter text.",
        },
        {
          role: "user",
          content: content,
        },
      ],
    });

    const enhancedContent = response.choices[0].message.content;
    return res.status(200).json({ enhancedContent });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};