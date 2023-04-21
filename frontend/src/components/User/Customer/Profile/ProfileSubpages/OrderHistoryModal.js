import axios from "axios";
import React from "react";
import { useState } from "react";

const OrderHistoryModal = ({
  setIsVisible,
  index,
  indexDva,
  orderHistory,
  idd,
  productId,
  setGetOrderHistoryTrigger,
  getOrderHistoryTrigger,
}) => {
  const [note, setNote] = useState(null);

  function handlePostNote() {
    axios
      .post("/api/customer/note-to-seller", {
        note,
        idd,
      })
      .then(() => {
        setNote("");
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
  return (
    <div className="h-full w-full absolute top-0 left-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <button
        className="absolute left-0 top-0 bg-white"
        onClick={() => setIsVisible(!getOrderHistoryTrigger)}
      >
        close
      </button>
      <div className="h-[90%] w-[85%] bg-gray-50 flex items-center justify-center">
        <div className="w-[30%] h-full">
          <img
            src={orderHistory[index].productBought[indexDva].productPicture}
            className="w-full h-full object-cover rounded-r-md"
          ></img>
        </div>
        <div className="w-[70%] h-full flex justify-center items-center">
          <div className="w-[80%] h-[85%]     ">
            <div className="h-[70%] w-full  bg-opacity-25 relative ">
              <h1 className="text-8xl">
                {orderHistory[index].productBought[indexDva].productName}
              </h1>
              <h1 className="text-2xl mt-6">
                {orderHistory[index].productBought[indexDva].productNewPrice}$
              </h1>{" "}
              <div className="text-xl font-bold mt-6 text-center absolute top-1 right-0">
                {orderHistory[index].orderPlacedDate}
              </div>
              <div className="w-full h-[90%] mt-1 ">
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
                    className="absolute bottom-0 right-0 bg-orange-500 p-2 rounded-md text-white w-full z-50 "
                  >
                    Add note
                  </button>
                </div>
              </div>
            </div>
            <div className="h-[30%] w-full flex relative   ">
              <div className="h-[33%] w-full flex absolute bottom-0 left-2 items-center">
                {" "}
                <h1 className="text-2xl">Product still hasn't been shipped</h1>
                <button
                  className="w-[30%] h-[80%] border-2 border-orange-500 text-black ml-4 rounded-md hover:bg-orange-500 hover:text-white transition-all"
                  onClick={handleCancelOrder}
                >
                  Cancel order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryModal;
