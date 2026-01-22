import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  ChevronRight,
  User,
  FileText,
  Briefcase,
  GraduationCap,
  FolderIcon,
  Sparkles,
} from "lucide-react";

// Dummy data placeholder (remove if you already have real data)
const dummyResumeData = [];

const ResumeBuilder = () => {
  const { resumeId } = useParams();

  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: "classic",
    accent_color: "#3B82F6",
    public: false,
  });

  const loadExistingResume = async () => {
    const resume = dummyResumeData.find((item) => item._id === resumeId);

    if (resume) {
      setResumeData(resume);
      document.title = resume.title;
    }
  };

  useEffect(() => {
    if (resumeId) {
      loadExistingResume();
    }
  }, [resumeId]);

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);

  const sections = [
    { id: "personal", name: "Personal Info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "projects", name: "Projects", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: Sparkles },
  ];

  const activeSection = sections[activeSectionIndex];

  const progressWidth = (activeSectionIndex * 100) / (sections.length - 1);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link
          to={"/app"}
          className="inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all"
        >
          <ArrowLeft className="size-4" />
          Back to Dashboard
        </Link>

        <div className="max-w-7xl mx-auto px-4 pb-8">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Left Panel - Form */}
            <div className="relative lg:col-span-5 rounded-lg overflow-hidden">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1">
                {/* Progress Bar */}
                <hr className="absolute top-0 left-0 right-0 border-2 border-gray-200" />
                <hr
                  className="absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-green-600 border-none transition-all duration-700"
                  style={{ width: `${progressWidth}%` }}
                />

                {/* Section Navigation */}
                <div className="flex justify-between items-center mb-6 border-b border-gray-300 py-1">
                  <div></div>

                  <div className="flex items-center">
                    {/* Previous Button */}
                    {activeSectionIndex !== 0 && (
                      <button
                        onClick={() =>
                          setActiveSectionIndex((prevIndex) =>
                            Math.max(prevIndex - 1, 0),
                          )
                        }
                        className="flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all"
                        disabled={activeSectionIndex === 0}
                      >
                        <ArrowLeft className="size-4" />
                        Previous
                      </button>
                    )}

                    {/* Next Button */}
                    <button
                      onClick={() =>
                        setActiveSectionIndex((prevIndex) =>
                          Math.min(prevIndex + 1, sections.length - 1),
                        )
                      }
                      className={`flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all ${
                        activeSectionIndex === sections.length - 1 &&
                        "opacity-50"
                      }`}
                      disabled={activeSectionIndex === sections.length - 1}
                    >
                      Next
                      <ChevronRight className="size-4" />
                    </button>
                  </div>
                </div>

                {/* Active Section Display (optional) */}
                <div className="text-sm text-gray-500">
                  Current Section:{" "}
                  <span className="font-medium text-gray-700">
                    {activeSection.name}
                  </span>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <div className="space-y-6">
              {activeSection.id === "personal" && (
               <div></div>
              )}
            </div>

            {/* Right Panel - Preview */}
            <div className="lg:col-span-7 border rounded-lg p-6">
              Resume Preview Area
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
