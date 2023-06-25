import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../../../../assets/svg-loaders/three-dots.svg";

const OrderHistoryModal = ({
  setIsVisible,
  index,
  indexDva,
  orderHistory,
  idd,
  productId,
  setGetOrderHistoryTrigger,
  getOrderHistoryTrigger,
  isFetching,
}) => {
  const [note, setNote] = useState(null);
  const [store, setStore] = useState(null);

  function handlePostNote() {
    axios
      .post("/api/customer/note-to-seller", {
        note,
        idd,
      })
      .then(() => {
        setGetOrderHistoryTrigger(!getOrderHistoryTrigger);
      });
  }

  function handleCancelOrder() {
    axios
      .post("/api/customer/cancel-order", {
        productId,
        idd,
      })
      .then(() => {
        setGetOrderHistoryTrigger(true);
        setIsVisible(false);
      });
  }

  useEffect(() => {
    axios
      .post("/api/customer/get-store", { storeId: orderHistory[index].seller })
      .then(({ data }) => setStore(data));
  }, []);

  return (
    <div className="h-full w-full absolute top-0 left-0 bg-black bg-opacity-20 0 z-50 flex items-center justify-center">
      <button
        className="absolute left-2 top-2  z-50"
        onClick={() => {
          setIsVisible(false);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-12 h-12 hover:text-orange-500"
        >
          <path
            fillRule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div className="h-[90%] w-[85%] bg-gray-50 flex items-center justify-center rounded-md relative">
        <div className="w-[30%] h-full">
          <img
            src={orderHistory[index].productBought[indexDva].productPicture}
            className="w-full h-full object-cover rounded-r-md rounded-l-md"
          ></img>
        </div>
        <div className="w-[70%] h-full flex justify-center items-center relative">
          {isFetching && (
            <div className="h-full w-full  flex items-center justify-center bg-black bg-opacity-25 absolute top-0 left-0 z-50">
              {" "}
              <img src={Loader} className="w-[15%] h-[15%] "></img>
            </div>
          )}
          <div className="w-[80%] h-[85%]     ">
            <div className="h-[70%] w-full  bg-opacity-25 relative ">
              <h1 className="text-8xl">
                {orderHistory[index].productBought[indexDva].productName}
              </h1>
              {orderHistory[index].productShipped ? (
                ""
              ) : (
                <h1 className="text-2xl mt-6">
                  {orderHistory[index].productBought[indexDva].productNewPrice}$
                </h1>
              )}{" "}
              <div className="text-xl font-bold mt-6 text-right absolute top-1 right-0">
                {orderHistory[index].orderPlacedDate.substring(0, 10)}
                <br />
                <span className="font-light">Store:</span>{" "}
                <Link to={store && `/store/${store.storeName}/${store._id}`}>
                  {store && store.storeName}
                </Link>
              </div>
              <div className="w-full h-[90%] mt-1 ">
                {orderHistory[index].productShipped ? (
                  ""
                ) : (
                  <>
                    <h1 className="text-gray-400">Write a note to seller:</h1>
                    <div className="relative h-[80%] w-full">
                      <input
                        defaultValue={orderHistory[index].noteToSeller}
                        type="text"
                        className="h-full w-full rounded-md"
                        onChange={(e) => setNote(e.target.value)}
                      ></input>
                      <button
                        onClick={handlePostNote}
                        className="absolute bottom-0 right-0 bg-orange-500 p-2 rounded-md text-white w-full z-40 "
                      >
                        Add note
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="h-[30%] w-full flex relative   ">
              <div className="h-[33%] w-full flex absolute bottom-0 left-2 items-center">
                {orderHistory[index].productShipped ? (
                  <div className="bg-gray-400 w-full text-white p-4 rounded-md shadow-lg">
                    <h1 className="text-2xl">
                      Product shipped, arrives in{""}
                      <span> </span>
                      <span className="text-3xl">
                        {orderHistory[index].arrivalDate}
                      </span>
                      {""} days
                    </h1>
                  </div>
                ) : (
                  <>
                    <h1 className="text-2xl">
                      Product still hasn't been shipped
                    </h1>
                    <button
                      className="w-[30%] h-[80%] border-2 border-orange-500 text-black ml-4 rounded-md hover:bg-orange-500 hover:text-white transition-all"
                      onClick={handleCancelOrder}
                    >
                      Cancel order
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryModal;
