import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <div>
      <div className="min-h-screen b-grey-50">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
