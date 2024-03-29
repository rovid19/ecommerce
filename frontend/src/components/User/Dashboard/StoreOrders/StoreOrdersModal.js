import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";

const StoreOrdersModal = ({
  setIsVisible,
  indexDva,
  idd,
  orderData,
  setOrderData,
  trigger,
  setTrigger,
  productId,
}) => {
  // STATES
  const [shippingDate, setShippingDate] = useState(null);
  const [store, setStore] = useState(null);

  // USEEFFECTS
  useEffect(() => {
    axios
      .post("/api/customer/get-store", { storeId: orderData.seller })
      .then(({ data }) => setStore(data));
  }, []);

  // FUNCTIONS
  function handleShipOrder() {
    if (!shippingDate) {
      alert("you must set shipping date");
    } else {
      axios
        .post("/api/store/confirm-order", {
          idd,
          productId,
          shippingDate,
          quantity: orderData.productQuantity[indexDva],
        })
        .then(({ data }) => {
          setOrderData(data);
          setIsVisible(false);
          setTrigger(!trigger);
        });
    }
  }

  function handleCancelOrder() {
    axios
      .post("/api/store/cancel-order", {
        idd,
      })
      .then(({ data }) => {
        setOrderData(data);
        setTrigger(!trigger);
        setIsVisible(false);
      });
  }

  return (
    <div className="h-full w-full absolute top-0 left-0 bg-neutral-800 bg-opacity-50 z-50 flex items-center justify-center">
      <button
        className="absolute left-2 lg:top-2 top-2  z-50"
        onClick={() => {
          setIsVisible(false);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="lg:w-12 lg:h-12 w-10 h-10 hover:text-orange-500 lg:text-neutral-300 text-neutral-300"
        >
          <path
            fillRule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div className="h-[75%] lg:h-[85%] w-full lg:w-[75%] bg-neutral-700 text-neutral-300 flex items-center justify-center rounded-md">
        <div className="w-[30%] h-full">
          <img
            src={orderData.productBought[indexDva].productPicture[0]}
            className="w-full h-full object-cover rounded-r-md rounded-l-md"
          ></img>
        </div>
        <div className="w-[70%] h-full flex justify-center items-center">
          <div className="w-[80%] h-[85%]     ">
            <div className="h-[70%] w-full  bg-opacity-25 relative ">
              <h1 className="text-xl lg:text-5xl 2xl:text-8xl">
                {orderData.productBought[indexDva].productName.length > 10
                  ? orderData.productBought[indexDva].productName.slice(0, 10) +
                    ".."
                  : orderData.productBought[indexDva].productName}
              </h1>
              <div className=" border-b-2 border-neutral-900 border-opacity-10 p-2">
                <h2 className="text-gray-400 mt-6">Total price paid:</h2>
                <h1 className="text-2xl lg:text-3xl ">
                  {orderData.productBought[indexDva].productNewPrice}$
                </h1>
              </div>
              <div className="text-base lg:text-xl font-bold mt-1 lg:mt-6 text-right absolute top-0 lg:top-1 right-0">
                {orderData.orderPlacedDate.substring(0, 10)}
                <br />
                <span className="font-light">Customer:</span>{" "}
                <h1>{orderData.buyerUsername} </h1>
              </div>{" "}
              <div className=" border-b-2 border-neutral-900 border-opacity-10 p-2">
                <h1 className="text-gray-400">Quantity</h1>
                <h2 className="text-xl lg:text-2xl">
                  {orderData.productQuantity[indexDva]}
                </h2>
              </div>
              <div className=" border-b-2 border-neutral-900 border-opacity-10 p-2">
                <h1 className="text-gray-400">Note:</h1>
                <p className="text-lg lg:text-xl">
                  {orderData.noteToSeller
                    ? orderData.noteToSeller
                    : "Customer didn't leave any note."}
                </p>
              </div>
              <div className=" border-b-2 border-neutral-900 border-opacity-10 p-2 ">
                <h1 className="text-gray-400">Approximate shipping date:</h1>
                <div className="w-full  relative">
                  <input
                    readOnly={orderData.productShipped ? true : false}
                    type="number"
                    value={orderData.arrivalDate}
                    className="w-full h-full rounded-md bg-neutral-700 z-50"
                    onChange={(e) => setShippingDate(e.target.value)}
                  />
                  <span className="absolute right-5 top-0">Days</span>
                </div>
              </div>
            </div>
            <input className="bg-neutral-700" />
            <div className="h-[30%] w-full flex relative   ">
              <div className="h-[33%] w-full flex absolute bottom-0 left-0 items-center">
                {" "}
                {orderData.productShipped ? (
                  <button
                    className="w-full h-[80%] border-2 border-orange-500 text-neutral-300 ml-4 rounded-md hover:bg-orange-500 hover:text-white transition-all"
                    onClick={() => {
                      handleCancelOrder();
                    }}
                  >
                    Cancel order
                  </button>
                ) : (
                  <button
                    className="w-full h-[80%] border-2 border-orange-500 text-neutral-300 ml-4 rounded-md hover:bg-orange-500 hover:text-white transition-all"
                    onClick={() => {
                      handleShipOrder();
                    }}
                  >
                    Conifrm order
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreOrdersModal;
