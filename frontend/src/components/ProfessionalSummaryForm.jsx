import React, { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import api from "../configs/api";
import toast from "react-hot-toast";

const ProfessionalSummaryForm = ({ data, onChange, setResumeData }) => {
  const { token } = useSelector((state) => state.auth);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateSummary = async () => {
    try {
      setIsGenerating(true);

      if (!data?.trim()) {
        toast.error("Please write a summary first");
        return;
      }

      const prompt = `Enhance my professional summary:\n${data}`;

      const response = await api.post(
        "/api/ai/enhance-pro-sum",
        { userContent: prompt },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response?.data?.enhancedContent) {
        setResumeData((prev) => ({
          ...prev,
          professional_summary: response.data.enhancedContent,
        }));
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Something went wrong"
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Professional Summary
          </h3>
          <p className="text-sm text-gray-500">
            Add summary for your resume here
          </p>
        </div>

        <button
          disabled={isGenerating}
          onClick={generateSummary}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 disabled:opacity-50"
        >
          {isGenerating ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Sparkles className="size-4" />
          )}
          Enhance Resume With AI
        </button>
      </div>

      <textarea
        value={data || ""}
        onChange={(e) => onChange(e.target.value)}
        rows={7}
        className="w-full p-3 border text-sm border-gray-300 rounded-lg resize-none"
        placeholder="Write a compelling professional summary..."
      />
    </div>
  );
};

export default ProfessionalSummaryForm;
