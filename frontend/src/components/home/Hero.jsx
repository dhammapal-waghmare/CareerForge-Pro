import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Hero = () => {
  const { user } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 py-4">
        <img src="/logo.png" alt="logo" className="h-10" />

        <div className="hidden md:flex gap-8 text-sm text-slate-700">
          <a href="#" className="hover:text-indigo-600">
            Home
          </a>
          <a href="#about" className="hover:text-indigo-600">
            About
          </a>
          <a href="#contact" className="hover:text-indigo-600">
            Contact
          </a>
        </div>

        <div className="hidden md:flex gap-3">
          {!user ? (
            <>
              <Link
                to="/app?state=login"
                className="px-5 py-2 text-sm border rounded-full text-slate-700 hover:bg-slate-100"
              >
                Login
              </Link>
              <Link
                to="/app?state=register"
                className="px-6 py-2 text-sm bg-indigo-600 text-white rounded-full hover:bg-indigo-700"
              >
                Get Started
              </Link>
            </>
          ) : (
            <Link
              to="/app"
              className="px-6 py-2 text-sm bg-indigo-600 text-white rounded-full hover:bg-indigo-700"
            >
              Dashboard
            </Link>
          )}
        </div>

        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden text-slate-700 text-xl"
        >
          ☰
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 flex flex-col gap-6 text-center w-72">
            <a href="#" onClick={() => setMenuOpen(false)}>
              Home
            </a>
            <a href="#about" onClick={() => setMenuOpen(false)}>
              About
            </a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>
              Contact
            </a>
            <button
              onClick={() => setMenuOpen(false)}
              className="mt-2 px-6 py-2 bg-indigo-600 text-white rounded-full"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-6 md:px-16 lg:px-24 mt-20">
        {/* Left Image */}
        <div className="flex justify-center md:justify-start">
          <img
            src="./resume.jpg"
            alt="AI Resume Builder"
            className="w-full max-w-lg md:max-w-xl rounded-2xl"
          />
        </div>

        {/* Right Content */}
        <div className="text-center md:text-left">
          <p className="text-sm text-indigo-600 font-medium">
            Trusted by 10,000+ users
          </p>

          <h1 className="mt-4 text-4xl md:text-5xl font-semibold">
            Your one place to build an {<br />}
            <span className="text-indigo-600">Impactful Resume</span>
          </h1>

          <p className="mt-6 text-slate-600 max-w-md">
            <i>
              Create professional, job-ready resumes in minutes using smart AI
              tools.
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
