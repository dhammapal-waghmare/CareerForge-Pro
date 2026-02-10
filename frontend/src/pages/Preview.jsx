import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ResumePreview from "../components/ResumePreview";
import Loader from "../components/Loader";
import { ArrowLeft, Download, Edit } from "lucide-react";
import { dummyResumeData } from "../assets/assets";

const Preview = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [resumeData, setResumeData] = useState(null);

  const loadResume = async () => {
    if (!resumeId) {
      setResumeData(null);
      setIsLoading(false);
      return;
    }
    
    // First check dummy data
    let foundResume = dummyResumeData.find((resume) => resume._id === resumeId);
    
    // If not found in dummy data, check localStorage
    if (!foundResume) {
      const storedResume = localStorage.getItem(`resume_${resumeId}`);
      if (storedResume) {
        foundResume = JSON.parse(storedResume);
      }
    }
    
    setResumeData(foundResume || null);
    setIsLoading(false);
  };

  useEffect(() => {
    loadResume();
  }, [resumeId]);

  const handleDownload = () => {
    window.print();
  };

  const handleEdit = () => {
    navigate(`/app/builder/${resumeId}`);
  };

  return resumeData ? (
    <div className="min-h-screen bg-slate-100">
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
                Edit Resume
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-1 bg-indigo-600 text-white text-sm px-4 py-2 rounded-md hover:bg-indigo-700 transition-all shadow"
              >
                <Download className="size-4" />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Resume Preview */}
      <div className="max-w-5xl mx-auto py-8 px-4">
        <ResumePreview
          data={resumeData}
          template={resumeData.template}
          accentColor={resumeData.accent_color}
          classes="shadow-lg"
        />
      </div>
    </div>
  ) : (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col items-center justify-center h-screen bg-slate-50">
          <div className="text-center max-w-md px-6">
            <p className="text-6xl text-slate-400 font-bold mb-4">404</p>
            <p className="text-2xl text-slate-600 font-medium mb-2">
              {!resumeId ? "No Resume Selected" : "Resume not found"}
            </p>
            <p className="text-slate-500 mb-8">
              {!resumeId 
                ? "Please select a resume from your dashboard to view."
                : "The resume you're looking for doesn't exist or has been removed."}
            </p>
            <div className="flex gap-3 justify-center">
              <Link
                to="/app"
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-6 py-3 font-medium transition-colors shadow-md"
              >
                <ArrowLeft className="size-4" />
                Go to Dashboard
              </Link>
              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg px-6 py-3 font-medium transition-colors"
              >
                Go to Home
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Preview;
