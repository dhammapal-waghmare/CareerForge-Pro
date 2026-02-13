import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../configs/api";
import toast from "react-hot-toast";
import { ArrowLeft, Download, Sparkles, Loader2, Save } from "lucide-react";

const CoverLetterBuilder = () => {
  const { token } = useSelector((state) => state.auth);
  const { coverLetterId } = useParams();
  const navigate = useNavigate();

  const [coverLetterName, setCoverLetterName] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [content, setContent] = useState("");
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);

  // Load existing cover letter if coverLetterId is provided
  useEffect(() => {
    if (coverLetterId) {
      loadCoverLetter();
    }
  }, [coverLetterId]);

  const loadCoverLetter = async () => {
    try {
      const { data } = await api.get(`/api/coverletters/get/${coverLetterId}`, {
        headers: { Authorization: token },
      });
      
      setCoverLetterName(data.title || "");
      setJobTitle(data.jobName || "");
      setJobDescription(data.jobDescription || "");
      setContent(data.content || "");
    } catch (error) {
      toast.error("Failed to load cover letter");
    }
  };

  const handleSaveCoverLetter = async () => {
    if (!coverLetterName || !jobTitle || !jobDescription) {
      toast.error("Please provide cover letter name, job title and description");
      return;
    }

    try {
      setSaving(true);

      if (coverLetterId) {
        // Update existing cover letter
        await api.put(
          `/api/coverletters/update/${coverLetterId}`,
          { title: coverLetterName, jobName: jobTitle, jobDescription, content },
          { headers: { Authorization: token } }
        );
        toast.success("Cover letter updated successfully!");
      } else {
        // Create new cover letter
        const { data } = await api.post(
          "/api/coverletters/create",
          { title: coverLetterName, jobName: jobTitle, jobDescription, content },
          { headers: { Authorization: token } }
        );
        toast.success("Cover letter saved successfully!");
        navigate(`/app/cover-letter/${data.coverLetter._id}`);
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to save cover letter");
    } finally {
      setSaving(false);
    }
  };

  const handleGenerateLetter = async () => {
    if (!jobTitle || !jobDescription) {
      toast.error("Please provide job title and description");
      return;
    }

    try {
      setGenerating(true);

      const contactBlock = [
        fullName && `Name: ${fullName}`,
        email && `Email: ${email}`,
        contactNumber && `Phone: ${contactNumber}`,
      ]
        .filter(Boolean)
        .join("\n");

      const jobDescriptionWithContact = contactBlock
        ? `${jobDescription}\n\nCandidate Contact:\n${contactBlock}`
        : jobDescription;

      const { data } = await api.post(
        "/api/ai/generate-cover-letter",
        { jobName: jobTitle, jobDescription: jobDescriptionWithContact },
        { headers: { Authorization: token } }
      );

      setContent(data.content || "");
      toast.success("Cover letter generated successfully!");
    } catch (error) {
      console.error(error);
      if (error?.response?.status === 429) {
        toast.error("Rate limit reached. Please wait a minute and try again.");
      } else {
        toast.error(error?.response?.data?.message || "Failed to generate cover letter");
      }
    } finally {
      setGenerating(false);
    }
  };

  const handleDownload = () => {
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${coverLetterName || 'Cover Letter'}</title>
          <style>
            body {
              font-family: 'Times New Roman', Times, serif;
              font-size: 12pt;
              line-height: 1.6;
              max-width: 8.5in;
              margin: 1in auto;
              padding: 0;
              color: #000;
            }
            h1 {
              font-size: 18pt;
              font-weight: bold;
              margin-bottom: 1em;
              text-align: center;
            }
            pre {
              font-family: 'Times New Roman', Times, serif;
              white-space: pre-wrap;
              word-wrap: break-word;
              margin: 0;
            }
            @media print {
              body {
                margin: 0.5in;
              }
            }
          </style>
        </head>
        <body>
          <h1>${'Cover Letter'}</h1>
          <pre>${content}</pre>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* TOP BAR */}
        <div className="flex justify-between items-center mb-4 print:hidden">
          <Link
            to="/app"
            className="inline-flex gap-2 items-center text-slate-500 hover:text-slate-700"
          >
            <ArrowLeft className="size-3" />
            Back to Dashboard
          </Link>

          <div className="flex gap-2">
            <button
              onClick={handleSaveCoverLetter}
              disabled={saving || !coverLetterName || !jobTitle || !jobDescription}
              className="flex items-center gap-1 bg-green-600 text-white text-xs px-3 py-1.5 rounded-md disabled:opacity-60 hover:bg-green-700"
            >
              {saving ? (
                <>
                  <Loader2 className="size-3 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="size-3" />
                  Save
                </>
              )}
            </button>
            <button
              onClick={handleDownload}
              disabled={!content}
              className="flex items-center gap-1 bg-indigo-600 text-white text-xs px-3 py-1.5 rounded-md disabled:opacity-60"
            >
              <Download className="size-3" />
              Download PDF
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* LEFT */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-lg shadow border p-6">
              <div className="mb-6 pb-4 border-b">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <Sparkles className="size-5 text-blue-600" />
                  Generate Cover Letter
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cover Letter Name *
                  </label>
                  <input
                    type="text"
                    value={coverLetterName}
                    onChange={(e) => setCoverLetterName(e.target.value)}
                    className="w-full h-11 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Software Engineer - Google"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full h-11 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-11 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    className="w-full h-11 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your contact number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Title
                  </label>
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="w-full h-11 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter the job title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Description
                  </label>
                  <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    className="w-full h-40 border border-gray-300 rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter the Job Description (e.g., responsibilities, requirements, company details)"
                  />
                </div>

                <button
                  onClick={handleGenerateLetter}
                  disabled={generating || !jobTitle || !jobDescription}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {generating ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="size-4" />
                      Generate with AI
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-lg shadow border p-12 min-h-[700px]">
              {content ? (
                <div className="space-y-4">
                  {/* Editable Content Area */}
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full min-h-[600px] border border-gray-200 rounded-lg p-6 font-serif text-base leading-relaxed text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
                    placeholder="Generated cover letter will appear here. You can edit it before saving."
                  />
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
                  <Sparkles className="size-10 mb-3" />
                  <p>Your generated cover letter will appear here.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverLetterBuilder;
