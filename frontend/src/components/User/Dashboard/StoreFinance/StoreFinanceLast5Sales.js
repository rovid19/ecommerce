import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const StoreFinanceLast5Sales = () => {
  const [last5, setLast5] = useState(null);

  const user = useSelector((state) => state.user.value);
  useEffect(() => {
    axios
      .post("/api/store/get-last-5-sales", { storeId: user.store._id })
      .then(({ data }) => setLast5(data));
  }, []);
  console.log(last5);
  return (
    <div className="w-full h-full">
      <div className="h-[10%] p-4">
        <h2 className="text-xl lg:text-2xl uppercase text-gray-300">
          Last 5 sales:
        </h2>
      </div>
      <div className="w-full h-[90%]">
        {last5 &&
          last5.map((item, index) => {
            const indexMap = index;
            return item.productBought.map((item, index) => {
              <div className="w-full h-[20%] bg-black"> </div>;
            });
          })}
      </div>
    </div>
  );
};

export default StoreFinanceLast5Sales;
