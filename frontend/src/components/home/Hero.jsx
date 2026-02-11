import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="min-h-screen bg-white">
      

      {/* Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center px-6 md:px-16 lg:px-24 mt-30  md:mt-12">
        
        <div className="flex justify-center md:justify-start">
          <img
            src="./resume.jpg"
            alt="AI Resume Builder"
            className="w-full max-w-lg md:max-w-xl rounded-2xl"
          />
        </div>

        <div className="text-center md:text-left">
          <p className="text-sm text-indigo-600 font-medium">
            Trusted by 10,000+ users
          </p>

          <h1 className="mt-4 text-4xl md:text-5xl font-semibold">
            Your one place to build an <br />
            <span className="text-indigo-600">Impactful Resume</span>
          </h1>

          <p className="mt-6 text-slate-600 max-w-md">
            <i>
              Create professional, job-ready resumes in minutes using smart AI tools.
            </i>
          </p>

          <div className="mt-8">
            <Link
              to="/app"
              className="inline-block px-8 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;