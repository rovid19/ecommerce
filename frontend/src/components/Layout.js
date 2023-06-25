import React, { useEffect, useState } from "react";
import Navbar from "./Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const Layout = () => {
  const [className, setClassName] = useState("collectionItems2");
  const storeSubPage = useSelector((state) => state.storeSubPage.value);
  const collectionItems = useSelector(
    (state) => state.collection.collectionItems
  );

  useEffect(() => {
    if (storeSubPage === "store") {
      switch (collectionItems.length) {
        case 1:
          setClassName("collectionItems2");
          break;
        case 2:
          setClassName("collectionItems2");
          break;
        case 3:
          setClassName("collectionItems4");
          break;
        case 4:
          setClassName("collectionItems4");
          break;

        case 5:
          setClassName("collectionItems6");
          break;
        case 6:
          setClassName("collectionItems4");
          break;
      }
    }
  }, [collectionItems]);

  return (
    <main className={className}>
      <div className="w-full h-16 z-50">
        {" "}
        <Navbar />
      </div>
      <div className="w-full flex-grow   ">
        <Outlet />
      </div>
    </main>
  );
};

export default Layout;
