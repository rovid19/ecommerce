import React, { useState } from "react";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Loader from "../../../../../assets/svg-loaders/three-dots.svg";
import OrderHistoryModal from "./OrderHistoryModal";

const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [index, setIndex] = useState(null);
  const [indexDva, setIndexDva] = useState(null);
  const [idd, setIdd] = useState(null);

  const [productId, setProductId] = useState(null);
  const [getOrderHistoryTrigger, setGetOrderHistoryTrigger] = useState(false);
  const user = useSelector((state) => state.userData.value.user);
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
    setIsFetching(true);
    axios.get("/api/customer/get-order-history").then(({ data }) => {
      setOrderHistory(data);
      setIsFetching(false);
    });
  }, [getOrderHistoryTrigger]);

  return (
    <div className="skrin w-full bg-white flex items-center justify-center relative">
      {isVisible && (
        <OrderHistoryModal
          setIsVisible={setIsVisible}
          index={index}
          indexDva={indexDva}
          orderHistory={orderHistory}
          idd={idd}
          productId={productId}
          setGetOrderHistoryTrigger={setGetOrderHistoryTrigger}
          getOrderHistoryTrigger={getOrderHistoryTrigger}
          isFetching={isFetching}
        />
      )}
      {isFetching ? (
        <div className="h-[90%] w-[80%] shadow-lg overflow-scroll scrollbar-hide flex items-center justify-center">
          {" "}
          <img src={Loader} className="w-[15%] h-[15%] "></img>
        </div>
      ) : (
        <div className="h-[90%] w-[80%] shadow-lg overflow-scroll scrollbar-hide">
          {orderHistory && orderHistory.length > 0 ? (
            orderHistory.map((item, index) => {
              let indexMap = index;
              return item.productBought.map((item, index) => {
                if (index === 0) {
                  return (
                    <div
                      className="h-[20%] w-full bg-gray-50 flex cursor-pointer hover:bg-gray-500 hover:text-white transition-all rounded-md "
                      onClick={() => {
                        setIsVisible(true);
                        setIndex(indexMap);
                        setIndexDva(index);
                        setIdd(orderHistory[indexMap]._id);
                        setProductId(item._id);
                      }}
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
                          <h1 className="text-3xl">{item.productName}</h1>

                          <p>{item.productDescription} </p>
                        </div>
                      </div>
                      <div className="h-full w-[20%] p-2">
                        <div className="h-full w-full border-l-2 border-gray-300 border-opacity-20 fl2">
                          <h1 className="">Price paid</h1>
                          <h1 className="text-4xl">{item.productNewPrice}$</h1>
                        </div>
                      </div>

                      <div className="w-[30%] h-full  p-2 border-l-2 border-gray-300 border-opacity-20 relative fl2">
                        <h1 className=" text-xl">Shippment Status</h1>
                        <div className="flex mt-2">
                          {orderHistory &&
                          orderHistory[indexMap].productShipped ? (
                            <>
                              <div className="bg-orange-500 p-2 rounded-md text-white flex">
                                Shipped
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
                              </div>
                            </>
                          ) : (
                            <>
                              Waiting to be shipped
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
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div
                      className="h-[20%] w-full bg-gray-50 flex cursor-pointer hover:bg-gray-500 hover:text-white transition-all rounded-md "
                      onClick={() => {
                        setIsVisible(true);
                        setIndex(indexMap);
                        setIndexDva(index);
                        setIdd(orderHistory[indexMap]._id);
                        setProductId(item._id);
                      }}
                    >
                      {}
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
                            {item.productNewPrice}$/
                            {orderHistory[indexMap].productQuantity[index]}
                          </h1>
                        </div>
                      </div>

                      <div className="w-[30%] h-full  p-2 border-l-2 border-gray-300 border-opacity-20 relative fl2">
                        <h1 className=" text-xl">Shippment Status</h1>
                        <div className="flex mt-2">
                          {orderHistory &&
                          orderHistory[indexMap].productShipped ? (
                            <>
                              "Shipped"
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
                              </svg>{" "}
                            </>
                          ) : (
                            <>
                              Waiting to be shipped
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
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                }
              });
            })
          ) : (
            <div className="h-full w-full flex items-center justify-center">
              <h1 className="text-gray-500 text-xl">
                Opps... It looks like you didn't make any purchase yet!
              </h1>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
