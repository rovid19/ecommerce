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
  modalClassname,
  setModalClassname,
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
    <div className="h-full w-full absolute top-0 left-0 bg-black bg-opacity-20 0 z-40 flex items-center justify-center">
      <div className={modalClassname}>
        <button
          className="absolute md:left-2 top-2 right-2  z-50"
          onClick={() => {
            setModalClassname((prev) => {
              let newPrev = prev.replace(
                "orderModalAniOpen",
                "orderModalAniClose"
              );
              return newPrev;
            });
            setTimeout(() => {
              setIsVisible(false);
              setModalClassname((prev) => {
                let newPrev = prev.replace("orderModalAniClose", "");
                return newPrev;
              });
            }, [300]);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="md:w-12 h-8 w-8 md:h-12 hover:text-orange-500 text-neutral-400"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
              clipRule="evenodd"
            />
          </svg>
        </button>
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
              <h1 className="text-xl md:text-4xl lg:text-6xl 2xl:text-8xl">
                {orderHistory[index].productBought[indexDva].productName}
              </h1>
              {orderHistory[index].productShipped ? (
                ""
              ) : (
                <h1 className="font-bold text-4xl mt-2 md:mt-2 lg:mt-6">
                  {orderHistory[index].productBought[indexDva].productNewPrice}$
                </h1>
              )}{" "}
              <div className="text-sm md:text-xl font-bold mt-[2px] lg:mt-[8px] 2xl:mt-6 text-right absolute top-1 right-0">
                {orderHistory[index].orderPlacedDate.substring(0, 10)}
                <br />
                <span className="font-light">Store:</span>{" "}
                <Link to={store && `/store/${store.storeName}/${store._id}`}>
                  {store && store.storeName}
                </Link>
              </div>
              <div className="w-full h-[80%] md:h-[90%] mt-4 lg:mt-1 ">
                {orderHistory[index].productShipped ? (
                  ""
                ) : (
                  <>
                    <h1 className="text-gray-400 text-sm md:text-base">
                      Write a note to seller:
                    </h1>
                    <div className="relative h-[95%] md:h-[80%] w-full mt-1">
                      <textarea
                        defaultValue={orderHistory[index].noteToSeller}
                        type="text"
                        className="h-full w-full rounded-md bg-neutral-700 p-2 md:text-base text-sm"
                        onChange={(e) => setNote(e.target.value)}
                      ></textarea>
                      <button
                        onClick={handlePostNote}
                        className="absolute bottom-0 right-0 bg-neutral-800 p-4 rounded-md text-neutral-500 w-full z-40 hover:text-neutral-200 "
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
                  <div className="bg-neutral-800 w-full text-white p-4 rounded-md shadow-lg">
                    <h1 className="text-base md:text-2xl">
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
                    <h1 className="text-base md:text-2xl">
                      Product still hasn't been shipped
                    </h1>
                    <button
                      className="text-sm w-[50%] md:w-[30%] h-full md:h-[80%] border-2 border-orange-500 text-black ml-4 rounded-md hover:bg-orange-500 hover:text-white transition-all"
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
