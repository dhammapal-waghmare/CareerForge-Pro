import React, { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import PersonalInfoForm from "../components/PersonalInfoForm";
import ProfessionalSummaryForm from "../components/ProfessionalSummaryForm";
import ExperienceForm from "../components/ExperienceForm";
import EducationForm from "../components/EducationForm";
import ProjectForm from "../components/ProjectForm";
import SkillsForm from "../components/SkillsForm";
import ResumePreview from "../components/ResumePreview";

import api from "../configs/api";

import {
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  User,
  FileText,
  Briefcase,
  GraduationCap,
  FolderIcon,
  Sparkles,
  Download,
  Eye,
  Save,
  Zap,
} from "lucide-react";

const ResumeBuilder = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();
  const printRef = useRef();

  const { token } = useSelector((state) => state.auth);

  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personal_info: {
      full_name: "",
      email: "",
      phone: "",
      location: "",
      profession: "",
      linkedin: "",
      website: "",
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
  const [saving, setSaving] = useState(false);
  const [showATS, setShowATS] = useState(false);
  const [atsData, setAtsData] = useState({ score: 0 });

  // 🔥 LOAD RESUME
  const loadExistingResume = async () => {
    try {
      const { data } = await api.get(
        `/api/resumes/get/${resumeId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (data?.resume) {
        setResumeData(data.resume);
        document.title = data.resume.title || "Resume";
        return true;
      }
    } catch (error) {
      console.log(error.message);
    }
    return false;
  };

  // 🔥 INIT
  useEffect(() => {
    const initResume = async () => {
      if (!resumeId) return;

      const loaded = await loadExistingResume();
      if (loaded) return;

      const stored = localStorage.getItem(`resume_${resumeId}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        setResumeData(parsed);
        document.title = parsed.title || "Resume";
        return;
      }

      const newResume = {
        _id: resumeId,
        title: "New Resume",
        personal_info: {
          full_name: "",
          email: "",
          phone: "",
          location: "",
          profession: "",
          linkedin: "",
          website: "",
        },
        professional_summary: "",
        experience: [],
        education: [],
        project: [],
        skills: [],
        template: "classic",
        accent_color: "#3B82F6",
        public: false,
      };

      setResumeData(newResume);
      localStorage.setItem(`resume_${resumeId}`, JSON.stringify(newResume));
      document.title = "New Resume";
    };

    initResume();
  }, [resumeId, token]);

  // 💾 LOCAL AUTOSAVE
  useEffect(() => {
    if (resumeData._id) {
      localStorage.setItem(
        `resume_${resumeData._id}`,
        JSON.stringify(resumeData)
      );
    }
  }, [resumeData]);

  // 🔥 SAVE TO BACKEND
  const handleSave = async () => {
    if (!resumeData._id) return;

    try {
      setSaving(true);

      const dataToSend = {
        ...resumeData,
        removeBackground,
      };

      await api.put(
        `/api/resumes/update/${resumeData._id}`,
        dataToSend,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      alert("Resume saved successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to save resume");
    } finally {
      setSaving(false);
    }
  };

  const sections = [
    { id: "personal", name: "Personal Info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "projects", name: "Projects", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: Sparkles },
  ];

  const activeSection = sections[activeSectionIndex];
  const progressWidth =
    (activeSectionIndex * 100) / (sections.length - 1);

  const handleDownload = () => window.print();
  const handlePreview = () => navigate(`/view/${resumeId}`);

  // 🔥 SECTION NAVIGATION
  const handlePrevious = () => {
    if (activeSectionIndex > 0) {
      setActiveSectionIndex(activeSectionIndex - 1);
    }
  };

  const handleNext = () => {
    if (activeSectionIndex < sections.length - 1) {
      setActiveSectionIndex(activeSectionIndex + 1);
    }
  };

  // 🔥 ATS SCORE CALCULATION
  const calculateATSScore = () => {
    let score = 0;

    // Personal info checks (30 points)
    if (resumeData.personal_info.full_name) score += 5;
    if (resumeData.personal_info.email) score += 5;
    if (resumeData.personal_info.phone) score += 5;
    if (resumeData.personal_info.profession) score += 5;
    if (resumeData.personal_info.linkedin || resumeData.personal_info.website)
      score += 5;
    if (resumeData.personal_info.location) score += 5;

    // Professional summary (15 points)
    if (resumeData.professional_summary?.length > 50) score += 15;

    // Experience sections (25 points)
    if (resumeData.experience.length > 0) {
      score += 10;
      resumeData.experience.forEach((exp) => {
        if (exp.company && exp.position && exp.description) score += 3;
      });
    }

    // Education sections (15 points)
    if (resumeData.education.length > 0) {
      score += 10;
      resumeData.education.forEach((edu) => {
        if (edu.institution && edu.degree && edu.field) score += 5;
      });
    }

    // Skills (10 points)
    if (resumeData.skills.length > 0) score += 10;

    // Project sections (5 points)
    if (resumeData.project.length > 0) score += 5;

    // Cap at 100
    score = Math.min(score, 100);

    setAtsData({ score });
    setShowATS(true);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* TOP BAR */}
        <div className="flex justify-between items-center mb-4">
          <Link
            to="/app"
            className="inline-flex gap-2 items-center text-slate-500 hover:text-slate-700"
          >
            <ArrowLeft className="size-3" />
            Back to Dashboard
          </Link>

          {/* 🔥 ACTION BUTTONS */}
          <div className="flex gap-2">
            <button
              onClick={calculateATSScore}
              className="flex items-center gap-1 bg-yellow-600 text-white text-xs px-3 py-1.5 rounded-md hover:bg-yellow-700"
            >
              <Zap className="size-3" />
              ATS Score
            </button>

            <button
              onClick={handlePreview}
              className="flex items-center gap-1 bg-green-600 text-white text-xs px-3 py-1.5 rounded-md"
            >
              <Eye className="size-3" />
              Preview
            </button>

            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-1 bg-blue-600 text-white text-xs px-3 py-1.5 rounded-md disabled:opacity-60"
            >
              <Save className="size-3" />
              {saving ? "Saving..." : "Save"}
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1 bg-indigo-600 text-white text-xs px-3 py-1.5 rounded-md"
            >
              <Download className="size-3" />
              Download PDF
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* LEFT */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-lg shadow border p-6 pb-16">
              {/* PROGRESS BAR */}
              <div className="relative mb-6">
                <div className="h-1 bg-gray-200 rounded-full" />
                <div
                  className="absolute top-0 left-0 h-1 bg-green-500 rounded-full transition-all duration-300"
                  style={{ width: `${progressWidth}%` }}
                />
              </div>

              {/* SECTION TABS */}
              <div className="mb-6 pb-4 border-b">
                <div className="flex flex-wrap gap-2">
                  {sections.map((section, index) => {
                    const Icon = section.icon;
                    const isActive = activeSectionIndex === index;
                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveSectionIndex(index)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg font-medium transition-all ${
                          isActive
                            ? "bg-blue-100 text-blue-700 shadow-sm"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                        title={section.name}
                      >
                        <Icon className="size-3.5" />
                        <span className="hidden sm:inline">{section.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SECTION HEADER */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  {React.createElement(activeSection.icon, { className: "size-5 text-blue-600" })}
                  {activeSection.name}
                </h2>
              </div>

              {activeSection.id === "personal" && (
                <PersonalInfoForm
                  data={resumeData.personal_info}
                  onChange={(data) =>
                    setResumeData((p) => ({
                      ...p,
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
                    setResumeData((p) => ({
                      ...p,
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
                    setResumeData((p) => ({
                      ...p,
                      experience: data,
                    }))
                  }
                />
              )}

              {activeSection.id === "education" && (
                <EducationForm
                  data={resumeData.education}
                  onChange={(data) =>
                    setResumeData((p) => ({
                      ...p,
                      education: data,
                    }))
                  }
                />
              )}

              {activeSection.id === "projects" && (
                <ProjectForm
                  data={resumeData.project}
                  onChange={(data) =>
                    setResumeData((p) => ({
                      ...p,
                      project: data,
                    }))
                  }
                />
              )}

              {activeSection.id === "skills" && (
                <SkillsForm
                  data={resumeData.skills}
                  onChange={(data) =>
                    setResumeData((p) => ({
                      ...p,
                      skills: data,
                    }))
                  }
                />
              )}

              {/* NAVIGATION BUTTONS */}
              <div className="flex gap-3 mt-8 pt-6 border-t">
                <button
                  onClick={handlePrevious}
                  disabled={activeSectionIndex === 0}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed rounded-lg transition-colors"
                >
                  <ChevronLeft className="size-4" />
                  Previous
                </button>

                {/* Section Indicator */}
                <div className="flex-1 flex items-center justify-center">
                  <span className="text-xs font-semibold text-gray-600 px-3 py-2 bg-gray-50 rounded-lg">
                    {activeSectionIndex + 1} / {sections.length}
                  </span>
                </div>

                <button
                  onClick={handleNext}
                  disabled={activeSectionIndex === sections.length - 1}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed rounded-lg transition-colors"
                >
                  Next
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-7" ref={printRef}>
            <ResumePreview
              data={resumeData}
              template={resumeData.template}
              accentColor={resumeData.accent_color}
            />
          </div>
        </div>

        {/* ================= ATS MODAL ================= */}
        {showATS && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-xs rounded-xl shadow-2xl overflow-hidden relative">
              {/* Blue Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-4 relative">
                <button
                  onClick={() => setShowATS(false)}
                  className="absolute top-2 right-2 text-blue-100 hover:text-white transition-colors text-lg"
                >
                  
                </button>

                <h2 className="text-lg font-bold text-white text-center">
                  ATS Score
                </h2>
              </div>

              {/* Content */}
              <div className="px-4 py-4">
                {/* Score Display */}
                <div className="text-center mb-4">
                  <div className="text-5xl font-bold text-blue-600 mb-1">
                    {atsData.score}%
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-700"
                      style={{ width: `${atsData.score}%` }}
                    />
                  </div>
                </div>

                {/* Score Level */}
                <div className="text-center mb-4">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    atsData.score >= 80 ? 'bg-green-100 text-green-700' :
                    atsData.score >= 60 ? 'bg-blue-100 text-blue-700' :
                    'bg-orange-100 text-orange-700'
                  }`}>
                    {atsData.score >= 80 ? 'Excellent' :
                     atsData.score >= 60 ? 'Good' :
                     atsData.score >= 40 ? 'Fair' : 'Needs Work'}
                  </span>
                </div>
              </div>

              {/* Close Button */}
              <div className="px-4 py-3 border-t bg-gray-50">
                <button
                  onClick={() => setShowATS(false)}
                  className="w-full bg-blue-600 text-white font-medium text-sm py-1.5 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
        {/* ============================================ */}
      </div>
    </div>
  );
};

export default ResumeBuilder;
