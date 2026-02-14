import React from "react";
import { Bot, Target, Zap } from "lucide-react";

const About = () => {
  return (
    <section
      id="about"
      className="pt-32 md:pt-36 lg:pt-40 pb-20 px-6 md:px-16 lg:px-24 bg-slate-50"
    >
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
          About Our <span className="text-indigo-600">CareerForge-PRO</span>
        </h2>

        <p className="mt-6 text-slate-600 leading-relaxed">
          Our AI-powered CareerForge-PRO helps job seekers create professional,
          ATS-optimized resumes in minutes. Instead of struggling with
          formatting and wording, our smart system analyzes your input and
          generates strong, job-ready resume content.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg text-indigo-600 flex items-center justify-center gap-2">
              <Bot size={20} /> AI Generated Content
            </h3>
            <p className="mt-3 text-sm text-slate-600">
              Smart suggestions for summaries, skills, and experience based on
              your profile.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg text-indigo-600 flex items-center justify-center gap-2">
              <Target size={20} className="text-red-500" /> ATS Optimized
            </h3>
            <p className="mt-3 text-sm text-slate-600">
              Built to pass Applicant Tracking Systems used by top companies.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg text-indigo-600 flex items-center justify-center gap-2">
              <Zap size={20} className="text-yellow-500" /> Fast & Easy
            </h3>
            <p className="mt-3 text-sm text-slate-600">
              Create, edit, and download resumes quickly with guided steps.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
