import React from "react";
import { Send, Mail, User } from "lucide-react";

const Contact = () => {
  return (
    <section
      id="contact"
      className="pt-32 md:pt-36 lg:pt-40 pb-20 px-6 md:px-16 lg:px-24 bg-white"
    >
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800">
          <span className="text-indigo-600">Contact Us</span>
        </h2>

        {/* Subtext */}
        <p className="text-center text-slate-600 mt-4 max-w-2xl mx-auto">
          Have questions or feedback about the CareerForge-PRO? Send us a
          message and we’ll get back to you soon.
        </p>

        {/* Form */}
        <form className="mt-12 grid gap-6">
          {/* Name + Email */}
          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Your Name"
              className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Message */}
          <textarea
            rows="3"
            placeholder="Your Message"
            className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>

          {/* Button */}
          <div className="text-center">
            <button
              type="submit"
              onClick={() => alert("Message sent successfully")}
              className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 hover:-translate-y-0.5 transition"
            >
              Send Message &nbsp;
              <Send className="inline mr-2" size={18} />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
