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
      className={storeSubPage === "finance" ? "store h-full w-full" : "hidden"}
    >
      <div className="h-[60%] grid grid-cols-2">
        <div className=" fl2 border-b-2 border-r-2 border-neutral-900  ">
          <StoreFinanceSales />
        </div>

        <div className=" border-b-2  border-neutral-900   ">
          <StoreFinanceLast5Sales />
        </div>
      </div>
      <div className="h-[40%] flex justify-center bg-neutral-800">
        <h1 className="text-neutral-500 text-base lg:text-xl">
          Yearly sales chart:
        </h1>{" "}
      </div>
    </div>
  );
};

export default StoreFinance;
