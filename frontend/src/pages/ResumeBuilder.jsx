import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import PersonalInfoForm from "../components/PersonalInfoForm";
import ProfessionalSummaryForm from "../components/ProfessionalSummaryForm";
import ExperienceForm from "../components/ExperienceForm";
import EducationForm from "../components/EducationForm";
import ProjectForm from "../components/ProjectForm";
import SkillsForm from "../components/SkillsForm";
import {
  ArrowLeft,
  ChevronRight,
  User,
  FileText,
  Briefcase,
  GraduationCap,
  FolderIcon,
  Sparkles,
  Save,
  Download,
} from "lucide-react";
import { dummyResumeData } from "../assets/assets";
import ResumePreview from "../components/ResumePreview";

const ResumeBuilder = () => {
  const { resumeId } = useParams();
  const printRef = useRef(); // For PDF print area

  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personal_info: {
      name: "",
      email: "",
      phone: "",
      image: "",
    },
    professional_summary: "",
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: "classic",
    accent_color: "#3B82F6",
    public: false,
  });

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);

  useEffect(() => {
    const resume = dummyResumeData.find((item) => item._id === resumeId);
    if (resume) {
      setResumeData(resume);
      document.title = resume.title;
    }
  }, [resumeId]);

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

  const handleSave = () => {
    console.log("Saved Resume Data:", resumeData);
    alert("Resume saved successfully ✅");
  };

  // ✅ DOWNLOAD PDF FUNCTION
  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* TOP BAR */}
        <div className="flex justify-between items-center mb-4">
          {/* Back Button */}
          <Link
            to="/app"
            className="inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all"
          >
            <ArrowLeft className="size-3" />
            Back to Dashboard
          </Link>

          {/* DOWNLOAD BUTTON */}
          <button
            onClick={handleDownload}
            className="flex items-center gap-1 bg-indigo-600 text-white text-xs px-3 py-1.5 rounded-md hover:bg-indigo-700 transition-all shadow"
          >
            <Download className="size-3" />
            Download PDF
          </button>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* LEFT PANEL */}
          <div className="lg:col-span-5 relative">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 pb-16">
              {/* Progress Bar */}
              <div className="relative mb-6">
                <div className="h-1 bg-gray-200 rounded-full" />
                <div
                  className="absolute top-0 left-0 h-1 bg-green-500 rounded-full transition-all duration-500"
                  style={{ width: `${progressWidth}%` }}
                />
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-gray-500">
                  Current Section:
                  <span className="ml-1 font-medium text-gray-700">
                    {activeSection.name}
                  </span>
                </p>

                <div className="flex items-center">
                  {activeSectionIndex !== 0 && (
                    <button
                      onClick={() =>
                        setActiveSectionIndex((prev) => Math.max(prev - 1, 0))
                      }
                      className="px-3 py-2 text-sm rounded-lg hover:bg-gray-100 flex items-center gap-1"
                    >
                      <ArrowLeft className="size-3" />
                      Prev
                    </button>
                  )}

                  <button
                    onClick={() =>
                      setActiveSectionIndex((prev) =>
                        Math.min(prev + 1, sections.length - 1)
                      )
                    }
                    className="px-3 py-2 text-sm rounded-lg hover:bg-gray-100 flex items-center gap-1"
                  >
                    Next
                    <ChevronRight className="size-3" />
                  </button>
                </div>
              </div>

              {/* Forms */}
              {activeSection.id === "personal" && (
                <PersonalInfoForm
                  data={resumeData.personal_info}
                  onChange={(data) =>
                    setResumeData((prev) => ({
                      ...prev,
                      personal_info: data,
                    }))
                  }
                  removeBackground={removeBackground}
                  setRemoveBackground={setRemoveBackground}
                />
              )}

              {activeSection.id === "summary" && (
                <ProfessionalSummaryForm
                  data={resumeData.professional_summary}
                  onChange={(data) =>
                    setResumeData((prev) => ({
                      ...prev,
                      professional_summary: data,
                    }))
                  }
                  setResumeData={setResumeData}
                />
              )}

              {activeSection.id === "experience" && (
                <ExperienceForm
                  data={resumeData.experience}
                  onChange={(data) =>
                    setResumeData((prev) => ({ ...prev, experience: data }))
                  }
                />
              )}

              {activeSection.id === "education" && (
                <EducationForm
                  data={resumeData.education}
                  onChange={(data) =>
                    setResumeData((prev) => ({ ...prev, education: data }))
                  }
                />
              )}

              {activeSection.id === "projects" && (
                <ProjectForm
                  data={resumeData.project}
                  onChange={(data) =>
                    setResumeData((prev) => ({ ...prev, project: data }))
                  }
                />
              )}

              {activeSection.id === "skills" && (
                <SkillsForm
                  data={resumeData.skills}
                  onChange={(data) =>
                    setResumeData((prev) => ({ ...prev, skills: data }))
                  }
                />
              )}

              {/* SAVE BUTTON */}
              <div className="absolute bottom-4 left-4">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-1 bg-indigo-600 text-white text-xs px-3 py-1.5 rounded-md hover:bg-indigo-700 transition-all shadow"
                >
                  <Save className="size-3" />
                  Save
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT PREVIEW PANEL */}
          <div className="lg:col-span-7 max-lg:mt-6" ref={printRef}>
            <ResumePreview
              data={resumeData}
              template={resumeData.template}
              accentColor={resumeData.accent_color}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
