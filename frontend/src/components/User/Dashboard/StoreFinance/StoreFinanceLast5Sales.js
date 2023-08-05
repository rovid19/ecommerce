import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../../../../assets/svg-loaders/three-dots.svg";

const StoreFinanceLast5Sales = () => {
  const [last5, setLast5] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const user = useSelector((state) => state.userData.value.user);
  useEffect(() => {
    setIsFetching(true);
    axios
      .post("/api/store/get-last-5-sales", { storeId: user.store._id })
      .then(({ data }) => {
        setLast5(data);
        setIsFetching(false);
      });
  }, []);

  return (
    <div className="w-full h-full bg-neutral-800">
      {isFetching && (
        <div className="h-full w-[calc(100%-12%)] left-[12%] flex items-center justify-center bg-neutral-800 absolute top-0">
          {" "}
          <img src={Loader}></img>{" "}
        </div>
      )}
      <div className="h-[10%] p-4 border-b-2 border-neutral-900 border-opacity-20">
        <h2 className="text-xl lg:text-2xl uppercase text-neutral-400">
          Last 5 sales:
        </h2>
      </div>
      <div className="w-full h-[90%]  overflow-scroll scrollbar-hide">
        {last5 &&
          last5.map((item, index) => {
            return (
              <div
                className={
                  index === 0
                    ? "w-full h-[25%] grid grid-cols-3 bg-neutral-900 p-2  rounded-md"
                    : "w-full h-[25%]  mt-2 grid grid-cols-3 bg-neutral-900 p-2 rounded-md"
                }
                key={index}
              >
                <div className="border-r-2 border-neutral-600 border-opacity-20 text-neutral-500">
                  <div className="h-[10%] w-full p-1 flex items-center justify-center">
                    <h1>Products</h1>
                  </div>
                  <div className="h-[90%] w-full p-1 flex items-center justify-center text-2xl text-neutral-300 gap-2">
                    <h1>{item.pro}</h1>
                  </div>
                </div>
                <div className="border-r-2 border-neutral-600 border-opacity-20 text-neutral-500">
                  <div className="h-[10%] w-full p-1 flex items-center justify-center">
                    <h1>Price</h1>
                  </div>
                  <div className="h-[90%] w-full p-1 flex items-center justify-center text-2xl text-neutral-400">
                    {item.total}$
                  </div>
                </div>
                <div className=" text-neutral-500">
                  <div className="h-[10%] w-full p-1 flex items-center justify-center">
                    <h1>Date</h1>
                  </div>
                  <div className="h-[90%] w-full p-1 flex items-center justify-center text-2xl text-neutral-400">
                    {item.orderPlacedDate}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default StoreFinanceLast5Sales;
