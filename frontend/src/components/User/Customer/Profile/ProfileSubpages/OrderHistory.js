import React, { useState } from "react";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState(null);
  const user = useSelector((state) => state.user.value);
  const params = useParams();
  const navigate = useNavigate();
  const { id } = params;
  useEffect(() => {
    if (user._id === id) {
    } else {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    axios.get("/api/customer/get-order-history").then(({ data }) => {
      setOrderHistory(data);
    });
  }, []);

  console.log(orderHistory);
  return (
    <div className="h-full w-full flex items-center justify-center relative">
      <button className="absolute left-[5%]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-16 h-16 hover:scale-95 text-gray-300 hover:text-black"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <button className="absolute right-[5%]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-16 h-16 hover:scale-95 text-gray-300 hover:text-black"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
      <div className="h-[90%] w-[80%] border-2 border-gray-300 border-opacity-20">
        {orderHistory ? (
          orderHistory.map((item, index) => {
            if (index === 0) {
              return (
                <div className="h-[20%] w-full bg-gray-50 flex ">
                  <div className="w-[50%]  h-full flex p-2">
                    <div className="h-full w-[50%] ">
                      {" "}
                      <img
                        src={item.productPicture}
                        className="h-full object-cover rounded-md w-full"
                      />
                    </div>
                    <div className="h-full w-[70%] fl3 ml-4">
                      <h1 className="text-3xl">{item.productName}</h1>

                      <p>{item.productDescription} </p>
                    </div>
                  </div>
                  <div className="h-full w-[20%] p-2">
                    <div className="h-full w-full border-l-2 border-gray-300 border-opacity-20 fl2">
                      <h1 className="">Price paid/quantity</h1>
                      <h1 className="text-4xl">
                        {item.productNewPrice}$ / {item.productNewPrice}{" "}
                      </h1>
                    </div>
                  </div>

                  <div className="w-[30%] h-full  p-2 border-l-2 border-gray-300 border-opacity-20 relative fl2">
                    <h1 className="text-black text-xl">Shippment Status</h1>
                    <h2 className="flex mt-2">
                      {" "}
                      Shipped{" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6 ml-2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                        />
                      </svg>
                    </h2>
                  </div>
                </div>
              );
            } else {
              return (
                <div className="h-[20%] w-full bg-gray-50 mt-1 flex ">
                  <div className="w-[70%] h-full flex p-2">
                    <div className="h-full w-[30%] ">
                      {" "}
                      <img
                        src={item.productPicture}
                        className="h-full object-cover rounded-md"
                      />
                    </div>
                    <div className="h-full w-[70%]"> </div>
                  </div>

                  <div className="w-[30%] h-full  p-2 border-l-2 border-black border-opacity-10 relative">
                    <h1 className="text-gray-300">Shippment Information</h1>
                  </div>
                </div>
              );
            }
          })
        ) : (
          <div className="h-full w-full flex items-center justify-center">
            <h1 className="text-gray-500 text-xl">
              Opps... It looks like you didn't make any purchase yet!
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
