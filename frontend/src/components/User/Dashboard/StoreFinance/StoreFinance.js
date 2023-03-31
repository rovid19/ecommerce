import React from "react";
import { useSelector } from "react-redux";
const StoreFinance = () => {
  const storeSubPage = useSelector((state) => state.storeSubPage.value);
  const user = useSelector((state) => state.user.value);
  const { store } = user;
  console.log(store);
  return (
    <div
      className={
        storeSubPage === "finance"
          ? "absolute top-0 h-screen w-screen lg:absolute lg:left-[15%] store lg:h-full lg:top-0"
          : "hidden"
      }
    >
      <div className="h-[60%] grid grid-cols-2 p-4">
        <div className=" fl2 border-b-2 border-r-2 border-gray-300 border-opacity-20">
          <h3 className="text-2xl text-gray-300">
            {" "}
            {store.storeName} Total Sales:
          </h3>
          <h1 className="text-9xl mt-2">0$</h1>
        </div>

        <div className="p-4  border-b-2  border-gray-300 border-opacity-20  ">
          <div className="h-[20%]">
            <h2 className="text-2xl uppercase text-gray-300">Last 10 sales:</h2>
          </div>
          <div className="h-[80%]"></div>
        </div>
      </div>
      <div className="h-[40%] flex justify-center">
        <h1 className="text-gray-500 text-xl">Yearly sales chart:</h1>{" "}
      </div>
    </div>
  );
};

export default StoreFinance;
