import React from "react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../../../../assets/svg-loaders/three-dots.svg";
import Calendar from "react-calendar";
import StoreOrdersModal from "../StoreOrders/StoreOrdersModal.js";
import "react-calendar/dist/Calendar.css";

const StoreOrders = () => {
  // STATES
  const [orderData, setOrderData] = useState(null);
  const [value, onChange] = useState(new Date());
  const [date, setDate] = useState(null);
  const [calendar, setCalendar] = useState(false);
  const [calendarDate, setCalendarDate] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [orders, setOrders] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [getOrdersTrigger, setGetOrdersTrigger] = useState(null);
  const [index, setIndex] = useState(null);
  const [indexDva, setIndexDva] = useState(null);
  const [idd, setIdd] = useState(null);
  const [trigger, setTrigger] = useState(false);
  const [productId, setProductId] = useState(null);

  // REDUX
  const storeSubPage = useSelector((state) => state.storeSubPage.value);
  const mobileActive = useSelector(
    (state) => state.triggeri.value.mobileActive
  );

  // DEFAULT DATE
  const formattedDate = value.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  // FETCHING DATA FOR ORDERED PRODUCTS
  useEffect(() => {
    setDate(formattedDate);
    setIsFetching(true);
    axios.post("/api/store/get-orders", { formattedDate }).then(({ data }) => {
      setOrders(data);
      setIsFetching(false);
    });
  }, [value, trigger]);

  // CLOSING CALENDAR AFTER CLICKING ON ANY DATE
  useEffect(() => {
    setCalendar(false);
  }, [value]);
  console.log(orders);
  return (
    <div
      className={
        storeSubPage === "orders"
          ? " store h-full w-full fl2 bg-neutral-800 "
          : "hidden"
      }
    >
      {isVisible && mobileActive && (
        <StoreOrdersModal
          setIsVisible={setIsVisible}
          index={index}
          indexDva={indexDva}
          orders={orders}
          idd={idd}
          productId={productId}
          setGetOrdersTrigger={setGetOrdersTrigger}
          getOrdersTrigger={getOrdersTrigger}
          setOrders={setOrders}
          orderData={orderData}
          setOrderData={setOrderData}
          trigger={trigger}
          setTrigger={setTrigger}
        />
      )}
      <div className="fl2">
        {" "}
        <h1 className="text-4xl lg:text-6xl 2xl:text-7xl text-white">Orders</h1>
        <h3
          className="text-neutral-400 mt-2 text-base lg:text-xl cursor-pointer hover:text-neutral-500"
          onClick={() => setCalendar(!calendar)}
        >
          {date}
        </h3>
      </div>
      <div className="w-[80%] h-[80%] bg-neutral-800 mt-2 shadow-xl relative">
        {/* EXTRA DETAILS ABOUT ORDER POPUP */}
        {isVisible && !mobileActive && (
          <StoreOrdersModal
            setIsVisible={setIsVisible}
            index={index}
            indexDva={indexDva}
            orders={orders}
            idd={idd}
            productId={productId}
            setGetOrdersTrigger={setGetOrdersTrigger}
            getOrdersTrigger={getOrdersTrigger}
            setOrders={setOrders}
            orderData={orderData}
            setOrderData={setOrderData}
            trigger={trigger}
            setTrigger={setTrigger}
          />
        )}
        {/* CALENDAR POPUP */}
        {calendar && (
          <div className="absolute top-0 bg-neutral-800 w-full h-full z-50 flex items-center justify-center bg-opacity-70">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-12 h-12 absolute left-2 top-2 cursor-pointer text-neutral-300 hover:text-orange-500"
              onClick={() => setCalendar(!calendar)}
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                clipRule="evenodd"
              />
            </svg>
            <Calendar value={value} onChange={onChange} />{" "}
          </div>
        )}{" "}
        {/* SVG LOADER WHEN DATA IS FETCHING */}
        {isFetching && (
          <div className="w-full h-full flex items-center justify-center absolute top-0 bg-neutral-800 z-50">
            <img src={Loader} className="w-[30%] h-24 object-cover"></img>
          </div>
        )}
        {/* MAPPING OVER ORDERER PRODUCTS ARRAY */}
        {orders && orders.length > 0 ? (
          orders.map((item, index) => {
            const indexMap = index;
            return item.productBought.map((item, index) => {
              return (
                <div
                  className="h-[20%] w-full bg-neutral-900 flex cursor-pointer hover:bg-neutral-700 hover:text-white transition-all rounded-md text-neutral-300"
                  onClick={() => {
                    setIsVisible(true);
                    setIndexDva(index);
                    setOrderData(orders[indexMap]);
                    setIdd(orders[indexMap]._id);
                    setProductId(item._id);
                  }}
                  key={index}
                >
                  <div className="w-[50%]  h-full flex p-2">
                    <div className="h-full w-[50%] ">
                      {" "}
                      <img
                        src={item.productPicture}
                        className="h-full object-cover rounded-md w-full"
                      />
                    </div>
                    <div className="h-full w-[70%] fl3 ml-4">
                      <h1 className="text-sm lg:text-3xl">
                        {item.productName}
                      </h1>

                      <p>{item.productDescription} </p>
                    </div>
                  </div>
                  <div className="h-full w-[40%] lg:w-[20%] p-2">
                    <div className="h-full w-full border-l-2 border-neutral-700 border-opacity-50 fl2">
                      <h1 className="text-sm lg:text-base">
                        Price paid/
                        {mobileActive && <br />}
                        quantity
                      </h1>
                      <h1 className="text-sm lg:text-4xl">
                        {item.productNewPrice}$
                      </h1>
                    </div>
                  </div>

                  <div className="w-[30%] h-full  p-2 border-l-2 border-neutral-700 border-opacity-50 relative fl2">
                    <h1 className=" text-sm text-center lg:text-xl">
                      Shipment{mobileActive && <br />} status
                    </h1>
                    <div className="flex mt-2">
                      {orders && orders[indexMap].productShipped ? (
                        <>
                          <div className="bg-orange-500 p-1 text-sm lg:text-base lg:p-2 rounded-md text-white flex">
                            Shipped
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="lg:w-6 lg:h-6 w-5 h-5 lg:ml-2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                              />
                            </svg>
                          </div>{" "}
                        </>
                      ) : (
                        <>
                          <h1 className="text-[10px] lg:text-xl text-center">
                            Waiting to be shipped
                          </h1>
                          {mobileActive ? (
                            ""
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6 ml-2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 6h.008v.008H6V6z"
                              />
                            </svg>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            });
          })
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <h1 className="text-2xl text-neutral-300">
              There's no orders for this date
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreOrders;
