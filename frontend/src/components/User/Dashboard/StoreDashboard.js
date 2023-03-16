import React from "react";
import { Outlet } from "react-router-dom";
import StoreDashboardNav from "./StoreDashboardNav";

const StoreDashboard = () => {
  return (
    <div className="h-screen w-screen">
      <StoreDashboardNav />
      <Outlet />
    </div>
  );
};

export default StoreDashboard;
