import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../configs/api";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import { ArrowLeft, Download, Edit } from "lucide-react";

const CoverLetterPreview = () => {
  const { coverLetterId } = useParams();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const [coverLetterData, setCoverLetterData] = useState(null);

  const loadCoverLetter = async () => {
    if (!coverLetterId) {
      setCoverLetterData(null);
      setIsLoading(false);
      return;
    }

    try {
      const { data } = await api.get(`/api/coverletters/get/${coverLetterId}`, {
        headers: { Authorization: token },
      });

      setCoverLetterData(data);
      setIsLoading(false);
    } catch (error) {
      toast.error("Failed to load cover letter");
      setCoverLetterData(null);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCoverLetter();
  }, [coverLetterId]);

  const handleDownload = () => {
    window.print();
  };

  const handleEdit = () => {
    navigate(`/app/cover-letter/${coverLetterId}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!coverLetterData) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Cover Letter Not Found
          </h2>
          <Link
            to="/app"
            className="text-indigo-600 hover:text-indigo-800 underline"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 print:bg-white">
      {/* Top Navigation Bar */}
      <div className="bg-white shadow-sm border-b border-gray-200 print:hidden">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Back Button */}
            <Link
              to="/app"
              className="inline-flex gap-2 items-center text-slate-600 hover:text-slate-900 transition-all"
            >
              <ArrowLeft className="size-4" />
              <span className="text-sm font-medium">Back to Dashboard</span>
            </Link>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={handleEdit}
                className="flex items-center gap-1 bg-slate-600 text-white text-sm px-4 py-2 rounded-md hover:bg-slate-700 transition-all shadow"
              >
                <Edit className="size-4" />
                Edit Cover Letter
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-1 bg-emerald-600 text-white text-sm px-4 py-2 rounded-md hover:bg-emerald-700 transition-all shadow"
              >
                <Download className="size-4" />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cover Letter Display */}
      <div className="max-w-4xl mx-auto px-4 py-8 print:py-12">
        <div className="bg-white rounded-lg shadow-lg p-12 print:shadow-none print:p-16">
          {/* Job Title - for reference only, not in print */}
          <div className="mb-6 print:hidden">
            <h1 className="text-2xl font-bold text-gray-800">
              {coverLetterData.jobName}
            </h1>
          </div>

          {/* Cover Letter Content */}
          <div className="prose prose-slate max-w-none">
            <div className="whitespace-pre-wrap text-base leading-relaxed text-gray-800">
              {coverLetterData.content || (
                <p className="text-gray-400 italic">
                  No content available. Please edit to add content.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverLetterPreview;
