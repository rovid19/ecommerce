import React from "react";
import { useSelector } from "react-redux";
const StoreFinance = () => {
  const storeSubPage = useSelector((state) => state.storeSubPage.value);
  console.log(storeSubPage);
  return (
    <div
      className={
        storeSubPage === "finance"
          ? "absolute left-[15%] store w-full h-full top-0"
          : "hidden"
      }
    >
      <h1> finance </h1>
    </div>
  );
};

export default StoreFinance;
