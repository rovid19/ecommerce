import React from "react";

const OrderHistoryModal = ({ setIsVisible, index, indexDva, orderHistory }) => {
  console.log(index, indexDva);

  console.log(orderHistory);
  console.log(index);
  return (
    <div className="h-full w-full absolute top-0 left-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <button
        className="absolute left-0 top-0 bg-white"
        onClick={() => setIsVisible(false)}
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
            <div className="h-[70%] w-full  bg-opacity-25 relative">
              <h1 className="text-8xl">
                {orderHistory[index].productBought[indexDva].productName}
              </h1>
              <h1 className="text-2xl mt-4">
                {orderHistory[index].productBought[indexDva].productDescription}
              </h1>{" "}
              <div className="text-xl font-bold mt-6 text-center absolute top-1 right-0">
                {orderHistory[index].orderPlacedDate}
              </div>
            </div>
            <div className="h-[30%] w-full flex relative   ">
              <div className="h-[33%] w-full flex absolute bottom-0 left-2 items-center">
                {" "}
                <h1 className="text-2xl">Product still hasn't been shipped</h1>
                <button className="w-[30%] h-[80%] border-2 border-orange-500 text-black ml-4 rounded-md hover:bg-orange-500 hover:text-white transition-all">
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
