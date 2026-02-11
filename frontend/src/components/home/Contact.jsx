import React from "react";

const Contact = () => {
  return (
    <section id="contact" className="py-20 px-6 md:px-16 lg:px-24 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800">
          Contact Us
        </h2>

        <p className="text-center text-slate-600 mt-4">
          Have questions or feedback about the AI Resume Builder? Send us a
          message.
        </p>

        <form className="mt-12 grid gap-6">
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

          <input
            type="text"
            placeholder="Subject"
            className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <textarea
            rows="5"
            placeholder="Your Message"
            className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>

          <button
            type="submit"
            className="w-fit px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 hover:-translate-y-0.5 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;