import React from "react";
import Navbar from "./Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const Layout = () => {
  const storeSubPage = useSelector((state) => state.storeSubPage.value);
  return (
    <main className="min-h-screen w-screen flex flex-col">
      <div className="w-full h-16 z-50">
        {" "}
        <Navbar />
      </div>
      <div className="w-full flex-grow  ">
        <Outlet />
      </div>
    </main>
  );
};

export default Layout;
