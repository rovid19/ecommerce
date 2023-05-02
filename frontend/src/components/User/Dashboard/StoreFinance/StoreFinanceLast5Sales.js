import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../../../../assets/svg-loaders/three-dots.svg";

const StoreFinanceLast5Sales = () => {
  const [last5, setLast5] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const user = useSelector((state) => state.user.value);
  useEffect(() => {
    setIsFetching(true);
    axios
      .post("/api/store/get-last-5-sales", { storeId: user.store._id })
      .then(({ data }) => {
        setLast5(data);
        setIsFetching(false);
      });
  }, []);
  console.log(last5);
  return (
    <div className="w-full h-full ">
      {isFetching && (
        <div className="h-full w-full flex items-center justify-center bg-white absolute top-0 left-0">
          {" "}
          <img src={Loader}></img>{" "}
        </div>
      )}
      <div className="h-[10%] p-4 border-b-2 border-gray-300 border-opacity-20">
        <h2 className="text-xl lg:text-2xl uppercase text-gray-300">
          Last 5 sales:
        </h2>
      </div>
      <div className="w-full h-[90%] overflow-scroll">
        {last5 &&
          last5.map((item, index) => {
            const indexMap = index;
            return (
              <div
                className={
                  index === 0
                    ? "w-full h-[20%] grid grid-cols-3 bg-gray-50 p-1  rounded-md"
                    : "w-full h-[20%]  mt-2 grid grid-cols-3 bg-gray-50 p-1 rounded-md"
                }
              >
                <div className="border-r-2 border-gray-300 border-opacity-20 text-gray-500">
                  <div className="h-[10%] w-full p-1 flex items-center justify-center">
                    <h1>Products</h1>
                  </div>
                  <div className="h-[90%] w-full p-1 flex items-center justify-center text-2xl text-black gap-2 overflow-scroll scrollbar-hide">
                    {item.productBought.map((picture) => {
                      return (
                        <img
                          src={picture.productPicture[0]}
                          className="w-[30%] h-[70%] rounded-md "
                        ></img>
                      );
                    })}
                  </div>
                </div>
                <div className="border-r-2 border-gray-300 border-opacity-20 text-gray-500">
                  <div className="h-[10%] w-full p-1 flex items-center justify-center">
                    <h1>Price</h1>
                  </div>
                  <div className="h-[90%] w-full p-1 flex items-center justify-center text-2xl text-black">
                    {item.total}$
                  </div>
                </div>
                <div className="border-r-2 border-gray-300 border-opacity-20 text-gray-500">
                  <div className="h-[10%] w-full p-1 flex items-center justify-center">
                    <h1>Date</h1>
                  </div>
                  <div className="h-[90%] w-full p-1 flex items-center justify-center text-2xl text-black">
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
