import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import StoreFinanceSales from "./StoreFinanceSales";
import StoreFinanceLast5Sales from "./StoreFinanceLast5Sales";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import axios from "axios";
const StoreFinance = () => {
  const [salesData, setSalesData] = useState({});
  const [options, setOptions] = useState(null);
  const [date, setDate] = useState(new Date());
  const storeSubPage = useSelector((state) => state.storeSubPage.value);
  const user = useSelector((state) => state.userData.value.user);
  const { store } = user;

  // DEFAULT DATE
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  useEffect(() => {
    axios
      .post("/api/store/get-last-week-sales", {
        userId: user._id,
        formattedDate,
      })
      .then(({ data }) => setSalesData(data));
  }, []);

  console.log(salesData);
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
      <div className="h-[40%] flex items-center flex-col bg-neutral-800 pt-8">
        <h1 className="text-neutral-500 text-base lg:text-xl mb-2">
          Last week sales:
        </h1>{" "}
        <div className="h-[80%] w-[80%] flex items-center justify-center">
          {Object.keys(salesData).length > 0 && <Bar data={salesData}></Bar>}
        </div>
      </div>
    </div>
  );
};

export default StoreFinance;
