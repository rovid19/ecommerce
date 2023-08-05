import React, { useDebugValue } from "react";
import { Outlet } from "react-router-dom";
import StoreDashboardNav from "./StoreDashboardNav";
import StoreDashboardNavMobile from "./StoreDasboardNavMobile.js";
import { useDispatch, useSelector } from "react-redux";
import StoreEdit from "./StoreEdit/StoreEdit";
import { setMobileActive, setShowNavbar } from "../../../app/features/triggeri";
import { useEffect } from "react";

const StoreDashboard = () => {
  const storeSubPage = useSelector((state) => state.storeSubPage.value);
  const mobileActive = useSelector(
    (state) => state.triggeri.value.mobileActive
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (window.innerWidth <= 1024) {
      dispatch(setShowNavbar(false));
      dispatch(setMobileActive(true));
    } else {
      dispatch(setShowNavbar(true));
      dispatch(setMobileActive(false));
    }
  }, []);
  console.log(storeSubPage);
  return (
    <div className="h-screen w-full flex">
      <div
        className={mobileActive ? "h-full w-0 zeze" : "h-full w-[12%]  zeze"}
      >
        <div className="lg:hidden h-full w-full">
          <StoreDashboardNavMobile />
        </div>
        <div className="hidden lg:block h-full w-full ">
          <StoreDashboardNav />
        </div>
      </div>
      <div className={mobileActive ? "h-full w-full " : "h-full w-[88%] "}>
        {storeSubPage === "editStore" ? <StoreEdit /> : <Outlet />}
      </div>
    </div>
  );
};

export default StoreDashboard;
