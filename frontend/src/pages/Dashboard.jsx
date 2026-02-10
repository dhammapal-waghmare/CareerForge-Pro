import React, { useEffect, useState } from "react";
import {
  FilePenLineIcon,
  Plus,
  UploadCloud,
  TrashIcon,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../configs/api";
import toast from "react-hot-toast";
import pdfToText from "react-pdftotext";
import mammoth from "mammoth";

const Dashboard = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const colors = ["#9333ea", "#0284c7", "#6366f1", "#2563eb", "#4f46e5"];

  const [allResumes, setAllResumes] = useState([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);

  const [title, setTitle] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ================= LOAD RESUMES ================= */
  const loadAllResumes = async () => {
    try {
      const { data } = await api.get("/api/users/resumes", {
        headers: { Authorization: token },
      });
      setAllResumes(data.resumes || []);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    loadAllResumes();
  }, []);

  /* ================= CREATE RESUME ================= */
  const createResume = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post(
        "/api/resumes/create",
        { title },
        { headers: { Authorization: token } }
      );

      setShowCreateResume(false);
      setTitle("");
      navigate(`/app/builder/${data.resume._id}`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  /* ================= UPLOAD RESUME ================= */
  const uploadResume = async (e) => {
    e.preventDefault();

    if (!resumeFile) {
      toast.error("Please select a resume file");
      return;
    }

    setLoading(true);

    try {
      let resumeText = "";

      if (resumeFile.type === "application/pdf") {
        resumeText = await pdfToText(resumeFile);
      } else if (
        resumeFile.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        const arrayBuffer = await resumeFile.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        resumeText = result.value;
      } else {
        toast.error("Only PDF or DOCX allowed");
        setLoading(false);
        return;
      }

      const { data } = await api.post(
        "/api/ai/upload-resume",
        { title, resumeText },
        { headers: { Authorization: token } }
      );

      toast.success("Resume uploaded successfully");

      setShowUploadResume(false);
      setTitle("");
      setResumeFile(null);

      navigate(`/app/builder/${data.resumeId}`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE ================= */
  const deleteResume = async (id) => {
    if (!window.confirm("Delete this resume?")) return;

    try {
      await api.delete(`/api/resumes/delete/${id}`, {
        headers: { Authorization: token },
      });

      setAllResumes((prev) => prev.filter((r) => r._id !== id));
      toast.success("Resume deleted");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* ACTION BUTTONS */}
        <div className="flex gap-4 flex-wrap">
          <button
            onClick={() => setShowCreateResume(true)}
            className="w-36 h-48 flex flex-col items-center justify-center gap-3
            border-2 border-dashed rounded-xl bg-white text-indigo-600 hover:bg-indigo-50"
          >
            <Plus className="size-12" />
            Create Resume
          </button>

          <button
            onClick={() => setShowUploadResume(true)}
            className="w-36 h-48 flex flex-col items-center justify-center gap-3
            border-2 border-dashed rounded-xl bg-white text-indigo-600 hover:bg-indigo-50"
          >
            <UploadCloud className="size-12" />
            Upload Resume
          </button>
        </div>

        <hr className="my-8" />

        {/* RESUME LIST */}
        <h2 className="text-xl font-semibold text-indigo-600 mb-4">
          Your Resumes
        </h2>

        <div className="flex gap-4 flex-wrap">
          {allResumes.map((resume, i) => (
            <div
              key={resume._id}
              onClick={() => navigate(`/app/builder/${resume._id}`)}
              className="w-36 h-48 rounded-xl border cursor-pointer
              flex flex-col items-center justify-center hover:shadow-md"
              style={{ background: `${colors[i % colors.length]}20` }}
            >
              <FilePenLineIcon />
              <p className="text-sm mt-2 text-center px-2">
                {resume.title}
              </p>

              <TrashIcon
                onClick={(e) => {
                  e.stopPropagation();
                  deleteResume(resume._id);
                }}
                className="text-red-500 mt-3 hover:scale-110"
              />
            </div>
          ))}
        </div>

        {/* CREATE MODAL */}
        {showCreateResume && (
          <form
            onSubmit={createResume}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <div className="bg-white p-6 rounded-xl w-full max-w-md relative">
              <X onClick={() => setShowCreateResume(false)}
                className="absolute right-4 top-4 cursor-pointer" />

              <h3 className="text-lg font-semibold mb-4">Create Resume</h3>

              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Resume title"
                className="w-full h-11 border rounded-lg px-3 mb-4"
                required
              />

              <button className="w-full h-11 bg-indigo-600 text-white rounded-lg">
                Create
              </button>
            </div>
          </form>
        )}

        {/* UPLOAD MODAL */}
        {showUploadResume && (
          <form
            onSubmit={uploadResume}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <div className="bg-white p-6 rounded-xl w-full max-w-lg relative">
              <X onClick={() => setShowUploadResume(false)}
                className="absolute right-4 top-4 cursor-pointer" />

              <h3 className="text-lg font-semibold mb-4">Upload Resume</h3>

              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Resume title"
                className="w-full h-11 border rounded-lg px-3 mb-4"
                required
              />

              <div className="flex gap-3">
                <input
                  type="file"
                  accept=".pdf,.docx"
                  onChange={(e) => setResumeFile(e.target.files[0])}
                  className="w-full h-11 border rounded-lg px-3"
                  required
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 h-11 bg-indigo-600 text-white rounded-lg"
                >
                  {loading ? "Uploading..." : "Upload"}
                </button>
              </div>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};

export default Dashboard;