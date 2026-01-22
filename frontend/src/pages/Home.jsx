import React from "react";
import Banner from "../components/home/Banner";
import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import Footer from "../components/home/Footer";

export const Home = () => {
  return (
    <div>
      <Banner />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
};

export default Home;
