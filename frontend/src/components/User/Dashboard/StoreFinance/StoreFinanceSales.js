import React, { useEffect } from "react";
import { useState } from "react";
import Calendar from "react-calendar";
import axios from "axios";
import "react-calendar/dist/Calendar.css";
import { useSelector } from "react-redux";

const StoreFinanceSales = () => {
  const [subPage, setSubPage] = useState("sales");
  const [value, onChange] = useState(new Date());
  const [today, setToday] = useState(new Date());
  const [calendar, setCalendar] = useState(false);
  const [dailySales, setDailySales] = useState(null);

  const user = useSelector((state) => state.user.value);

  // DEFAULT DATE
  const formattedDate = value.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  const todayDate = today.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  useEffect(() => {
    axios
      .post("/api/store/get-daily-sales", {
        formattedDate,
        storeId: user && user.store._id,
      })
      .then(({ data }) => setDailySales(data));
  }, [value]);

  useEffect(() => {
    setCalendar(false);
  }, [value]);

  return (
    <div className="w-full h-full fl2 relative">
      {calendar && (
        <div className="absolute top-0 left-0 flex items-center justify-center bg-white bg-opacity-50 h-full w-full">
          <Calendar value={value} onChange={onChange} />{" "}
        </div>
      )}
      <div className="w-full h-[10%] grid grid-cols-2">
        <button
          onClick={() => {
            setSubPage("sales");
            setCalendar(true);
          }}
          className={
            subPage === "sales"
              ? "bg-gray-400 text-white"
              : "border-b-2  border-gray-300 border-opacity-20"
          }
        >
          {formattedDate === todayDate
            ? "Today Sales"
            : formattedDate + " " + "Sales"}
        </button>
        <button
          onClick={() => setSubPage("total")}
          className={
            subPage === "total"
              ? "bg-gray-400 text-white"
              : "border-l-2 border-b-2 border-gray-300 border-opacity-20"
          }
        >
          Total Sales
        </button>
      </div>
      <div className="w-full h-[90%] fl2">
        <h3 className="text-xl lg:text-2xl text-gray-300">
          {subPage === "sales"
            ? formattedDate === todayDate
              ? "Today Sales"
              : formattedDate + " " + "Sales"
            : "Total Sales"}
        </h3>
        <h1 className="text-8xl lg:text-9xl mt-2">{dailySales}$</h1>
      </div>
    </div>
  );
};

export default StoreFinanceSales;