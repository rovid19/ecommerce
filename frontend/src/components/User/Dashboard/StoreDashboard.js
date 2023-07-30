import React from "react";
import { Outlet } from "react-router-dom";
import StoreDashboardNav from "./StoreDashboardNav";
import StoreDashboardNavMobile from "./StoreDasboardNavMobile.js";

const StoreDashboard = () => {
  return (
    <div className="h-screen w-screen">
      <div className="h-full w-[15%]">
        <div className="lg:hidden h-full w-full">
          <StoreDashboardNavMobile />
        </div>
        <div className="hidden lg:block h-full w-full ">
          <StoreDashboardNav />
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default StoreDashboard;
