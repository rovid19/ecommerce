import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../../../../assets/svg-loaders/three-dots.svg";

const StoreFinanceLast5Sales = () => {
  // STATES
  const [last5, setLast5] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  // REDUX
  const user = useSelector((state) => state.userData.value.user);

  // USEEFFECT
  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      setIsFetching(true);
      axios
        .post("/api/store/get-last-5-sales", { storeId: user.store._id })
        .then(({ data }) => {
          setLast5(data.reverse());
          setIsFetching(false);
        });
    }
  }, [user]);

  return (
    <div className="w-full h-full bg-neutral-800">
      {isFetching && (
        <div className="h-full w-[calc(100%-12%)] left-[12%] flex items-center justify-center bg-neutral-800 absolute top-0">
          {" "}
          <img src={Loader}></img>{" "}
        </div>
      )}
      <div className="h-[50px] lg:h-[10%] pl-2 pt-2  border-b-2 border-neutral-900 border-opacity-20 ">
        <h2 className="text-xl lg:text-xl uppercase text-neutral-400">
          Last 5 sales:
        </h2>
      </div>
      <div className="w-full h-[calc(98%-50px)] lg:h-[90%] overflow-y-scroll scrollbar-hide ">
        {last5 &&
          last5.map((item, index) => {
            return (
              <article
                className={
                  index === 0
                    ? "bg-neutral-900 w-full lg:h-[25%] grid grid-cols-3 h-[40%]"
                    : "bg-neutral-900 mt-1 w-full lg:h-[25%] grid grid-cols-3 h-[40%]"
                }
              >
                <div className="h-full w-full border-r-2 border-neutral-600 border-opacity-20">
                  <div className="h-[10%] flex justify-center items-center text-neutral-500 pt-4 ">
                    <h1>Products</h1>
                  </div>
                  <div className="h-[90%] flex justify-center items-center text-neutral-300">
                    <h2>
                      {item.productBought[0].productName.length > 10
                        ? item.productBought[0].productName.slice(0, 10)
                        : item.productBought[0].productName}
                    </h2>
                  </div>
                </div>
                <div className="h-full w-full border-r-2 border-neutral-600 border-opacity-20">
                  <div className="h-[10%] flex justify-center items-center text-neutral-500 pt-4 ">
                    <h1>Price</h1>
                  </div>
                  <div className="h-[90%] flex justify-center items-center text-neutral-300">
                    <h2>{item.total}$</h2>
                  </div>
                </div>
                <div className="h-full w-full border-r-2 border-neutral-600 border-opacity-20">
                  <div className="h-[10%] flex justify-center items-center text-neutral-500 pt-4 ">
                    <h1>Date</h1>
                  </div>
                  <div className="h-[90%] flex justify-center items-center text-neutral-300">
                    <h2>{item.orderPlacedDate}</h2>
                  </div>
                </div>
              </article>
            );
          })}
      </div>
    </div>
  );
};

export default StoreFinanceLast5Sales;
