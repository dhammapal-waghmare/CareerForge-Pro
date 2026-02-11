import React from "react";
import Banner from "../components/home/Banner";
import Hero from "../components/home/Hero";
import Footer from "../components/home/Footer";
import Navbar from "../components/home/Navbar";
import About from "../components/home/About";
import Contact from "../components/home/Contact";

export const Home = () => {
  return (
    <div >   
      <Banner />
      <Navbar />
      <Hero />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
