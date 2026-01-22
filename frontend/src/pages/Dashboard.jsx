import React, { useEffect, useState } from "react";
import {
  FilePenLineIcon,
  Plus,
  UploadCloud,
  TrashIcon,
  PencilIcon,
  X,
} from "lucide-react";
import { dummyResumeData } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const colors = ["#9333ea", "#0284c7", "#6366f1", "#2563eb", "#4f46e5"];

  const [allResumes, setAllResumes] = useState([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState("");
  const [resumeFile, setResumeFile] = useState(null);

  const [editResumeId, setEditResumeId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const navigate = useNavigate();

  // Load Dummy Data
  useEffect(() => {
    setAllResumes(dummyResumeData);
  }, []);

  // Create Resume
  const createResume = (e) => {
    e.preventDefault();
    setShowCreateResume(false);
    navigate("/app/builder/result358");
  };

  // Upload Resume
  const uploadResume = (e) => {
    e.preventDefault();
    setShowUploadResume(false);
    navigate("/app/builder/res123");
  };

  // Delete Resume
  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this resume?"
    );
    if (!confirmed) return;

    const updatedList = allResumes.filter(
      (resume) => resume._id !== id
    );
    setAllResumes(updatedList);
  };

  // Open Edit Modal
  const openEditModal = (resume) => {
    setEditResumeId(resume._id);
    setEditTitle(resume.title);
  };

  // Update Resume Title
  const updateResumeTitle = (e) => {
    e.preventDefault();

    const updatedResumes = allResumes.map((resume) =>
      resume._id === editResumeId
        ? { ...resume, title: editTitle }
        : resume
    );

    setAllResumes(updatedResumes);
    setEditResumeId(null);
    setEditTitle("");
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Header */}
        {/* <p className="text-2xl font-medium mb-6 bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
          Welcome, Tony Stark 🚀
        </p> */}

        {/* Buttons */}
        <div className="flex gap-4 flex-wrap">
          {/* Create Resume */}
          <button
            onClick={() => setShowCreateResume(true)}
            className="w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-xl gap-3 text-indigo-600 border border-dashed border-indigo-300 bg-white hover:border-indigo-500 hover:shadow-lg transition-all"
          >
            <Plus className="size-12 p-2 bg-indigo-100 rounded-full" />
            <p className="text-sm font-medium">Create Resume</p>
          </button>

          {/* Upload Resume */}
          <button
            onClick={() => setShowUploadResume(true)}
            className="w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-xl gap-3 text-indigo-600 border border-dashed border-indigo-300 bg-white hover:border-indigo-500 hover:shadow-lg transition-all"
          >
            <UploadCloud className="size-12 p-2 bg-indigo-100 rounded-full" />
            <p className="text-sm font-medium">Upload Resume</p>
          </button>
        </div>

        <hr className="border-slate-300 my-6 sm:w-[320px]" />

        {/* Resume Cards */}
        <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
          {allResumes.map((resume, index) => {
            const baseColor = colors[index % colors.length];

            return (
              <button
                key={resume._id}
                onClick={() => navigate(`/app/builder/${resume._id}`)}
                className="relative group w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-xl gap-2 border hover:shadow-lg transition-all cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40)`,
                  borderColor: `${baseColor}40`,
                }}
              >
                <FilePenLineIcon
                  className="size-8"
                  style={{ color: baseColor }}
                />

                <p
                  className="text-sm font-medium text-center px-2"
                  style={{ color: baseColor }}
                >
                  {resume.title}
                </p>

                <p
                  className="absolute bottom-1 text-[11px] text-center px-2"
                  style={{ color: `${baseColor}90` }}
                >
                  Updated on{" "}
                  {new Date(resume.updatedAt).toLocaleDateString()}
                </p>

                {/* Actions */}
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-1 right-1 hidden group-hover:flex gap-1"
                >
                  {/* Delete */}
                  <TrashIcon
                    onClick={() => handleDelete(resume._id)}
                    className="size-7 p-1 hover:bg-white/70 rounded cursor-pointer text-red-600"
                  />

                  {/* Edit */}
                  <PencilIcon
                    onClick={() => openEditModal(resume)}
                    className="size-7 p-1 hover:bg-white/70 rounded cursor-pointer text-indigo-600"
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* ---------------- CREATE MODAL ---------------- */}
        {showCreateResume && (
          <form
            onSubmit={createResume}
            onClick={() => setShowCreateResume(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur z-10 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white rounded-xl w-full max-w-sm p-6 shadow-xl"
            >
              <h2 className="text-xl font-bold mb-4 text-indigo-700">
                Create Resume
              </h2>

              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Enter resume title"
                className="w-full px-4 py-2 mb-4 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />

              <button className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all">
                Create Resume
              </button>

              <X
                className="absolute top-4 right-4 cursor-pointer text-slate-400 hover:text-indigo-600"
                onClick={() => {
                  setShowCreateResume(false);
                  setTitle("");
                }}
              />
            </div>
          </form>
        )}

        {/* ---------------- UPLOAD MODAL ---------------- */}
        {showUploadResume && (
          <form
            onSubmit={uploadResume}
            onClick={() => setShowUploadResume(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur z-10 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-indigo-50 rounded-xl w-full max-w-sm p-6 shadow-xl"
            >
              <h2 className="text-xl font-bold mb-4 text-indigo-700">
                Upload Resume
              </h2>

              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Enter resume title"
                className="w-full px-4 py-2 mb-4 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />

              {/* Hidden file input */}
              <input
                type="file"
                id="resumeFile"
                hidden
                onChange={(e) => setResumeFile(e.target.files[0])}
              />

              {/* Upload box */}
              <label
                htmlFor="resumeFile"
                className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-indigo-300 rounded-lg p-6 my-4 cursor-pointer hover:border-indigo-500 hover:bg-indigo-100 transition-all"
              >
                <UploadCloud className="size-12 text-indigo-500" />
                {resumeFile ? (
                  <p className="text-indigo-700 font-medium text-center">
                    {resumeFile.name}
                  </p>
                ) : (
                  <p className="text-indigo-600 text-center">
                    Click to upload resume
                  </p>
                )}
              </label>

              <button className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all">
                Upload Resume
              </button>

              <X
                className="absolute top-4 right-4 cursor-pointer text-slate-400 hover:text-indigo-600"
                onClick={() => {
                  setShowUploadResume(false);
                  setTitle("");
                  setResumeFile(null);
                }}
              />
            </div>
          </form>
        )}

        {/* ---------------- EDIT MODAL ---------------- */}
        {editResumeId && (
          <form
            onSubmit={updateResumeTitle}
            onClick={() => setEditResumeId(null)}
            className="fixed inset-0 bg-black/70 backdrop-blur z-10 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white rounded-xl w-full max-w-sm p-6 shadow-xl"
            >
              <h2 className="text-xl font-bold mb-4 text-indigo-700">
                Edit Resume Title
              </h2>

              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                type="text"
                className="w-full px-4 py-2 mb-4 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />

              <button className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all">
                Update
              </button>

              <X
                className="absolute top-4 right-4 cursor-pointer text-slate-400 hover:text-indigo-600"
                onClick={() => setEditResumeId(null)}
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
