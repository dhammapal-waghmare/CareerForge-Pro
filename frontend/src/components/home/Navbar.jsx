import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Auto close 
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close on ESC key
  useEffect(() => {
    const esc = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  // Close on outside
  useEffect(() => {
    const outside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener("mousedown", outside);
    return () => document.removeEventListener("mousedown", outside);
  }, [menuOpen]);

  //  Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  return (
    <>
      <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 py-4 bg-white sticky top-0 z-50 shadow-sm">
        <img src="/logo.png" alt="logo" className="h-10" />

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 text-sm text-slate-700">
          {["Home", "About", "Contact"].map((item) => (
            <a
              key={item}
              href={item === "Home" ? "#" : `#${item.toLowerCase()}`}
              className="relative group hover:text-indigo-600 transition"
            >
              {item}
              <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex gap-3">
          {!user ? (
            <>
              <Link
                to="/app?state=login"
                className="relative px-5 py-2 text-sm font-medium rounded-md border border-indigo-600 text-indigo-600 overflow-hidden group"
              >
                <span className="relative z-10 group-hover:text-white transition">
                  Login
                </span>
                <span className="absolute inset-0 bg-indigo-600 w-0 group-hover:w-full transition-all duration-300"></span>
              </Link>

              <Link
                to="/app?state=register"
                className="px-6 py-2 text-sm font-semibold rounded-md bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 transition-all duration-200"
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

        {/* Mobile Button */}
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden text-xl"
        >
          ☰
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed  inset-0 bg-black/40 flex items-center justify-center z-50">
          <div
            ref={menuRef}
            className="bg-white/95 backdrop-blur rounded-2xl p-8 flex flex-col gap-4 text-center w-80 shadow-2xl border border-slate-100"
          >
            <a onClick={() => setMenuOpen(false)} className=" py-2 rounded-lg hover:bg-indigo-200 hover:text-indigo-900 font-medium transition">Home</a>
            <a href="#about" onClick={() => setMenuOpen(false)} className=" py-2 rounded-lg hover:bg-indigo-200 hover:text-indigo-900 font-medium transition">About</a>
            <a href="#contact" onClick={() => setMenuOpen(false)} className="py-2 rounded-lg hover:bg-indigo-200 hover:text-indigo-900 font-medium transition">Contact</a>

            <div className="h-px bg-slate-200 my-2"></div>

            {!user ? (
              <>
                <Link to="/app?state=login" onClick={() => setMenuOpen(false)} className=" py-2 border border-indigo-600 text-indigo-600 rounded-lg font-medium hover:bg-indigo-200 transition">
                  Login
                </Link>
                <Link to="/app?state=register" onClick={() => setMenuOpen(false)} className=" py-2 border border-indigo-600 text-indigo-600 rounded-lg font-medium hover:bg-indigo-200 transition">
                  Get Started
                </Link>
              </>
            ) : (
              <Link to="/app" onClick={() => setMenuOpen(false)} className="py-2 bg-indigo-900 text-white rounded-lg font-semibold hover:bg-indigo-900 transition">
                Dashboard
              </Link>
            )}

            <button
              onClick={() => setMenuOpen(false)}
              className="mt-4 inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold
             bg-slate-900 text-white rounded-full
             hover:bg-black hover:scale-105 active:scale-95
             transition-all duration-200 shadow-md"
            >
              ✕ Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;