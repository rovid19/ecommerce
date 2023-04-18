import React from "react";
import Navbar from "./Navbar/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="h-screen w-screen">
      <div className="w-full h-[7%] z-50">
        {" "}
        <Navbar />
      </div>
      <div className="w-full h-[93%]">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
