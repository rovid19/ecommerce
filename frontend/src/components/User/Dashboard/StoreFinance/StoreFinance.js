import React from "react";
import { useSelector } from "react-redux";
import StoreFinanceSales from "./StoreFinanceSales";
import StoreFinanceLast5Sales from "./StoreFinanceLast5Sales";
const StoreFinance = () => {
  const storeSubPage = useSelector((state) => state.storeSubPage.value);
  const user = useSelector((state) => state.userData.value.user);
  const { store } = user;

  return (
    <div
      className={
        storeSubPage === "finance"
          ? "absolute top-0 h-screen w-screen lg:absolute lg:left-[15%] store lg:h-full lg:top-0"
          : "hidden"
      }
    >
      <div className="h-[60%] grid grid-cols-2">
        <div className=" fl2 border-b-2 border-r-2 border-gray-300  border-opacity-20">
          <StoreFinanceSales />
        </div>

        <div className=" border-b-2  border-gray-300 border-opacity-20  ">
          <StoreFinanceLast5Sales />
          <div className="h-[80%]"></div>
        </div>
      </div>
      <div className="h-[40%] flex justify-center">
        <h1 className="text-gray-500 text-base lg:text-xl">
          Yearly sales chart:
        </h1>{" "}
      </div>
    </div>
  );
};

export default StoreFinance;
