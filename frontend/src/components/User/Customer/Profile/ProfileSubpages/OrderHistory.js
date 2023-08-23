import React, { useState } from "react";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Loader from "../../../../../assets/svg-loaders/three-dots.svg";
import OrderHistoryModal from "./OrderHistoryModal";

const OrderHistory = () => {
  // STATES
  const [orderHistory, setOrderHistory] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [index, setIndex] = useState(null);
  const [indexDva, setIndexDva] = useState(null);
  const [idd, setIdd] = useState(null);
  const [productId, setProductId] = useState(null);
  const [getOrderHistoryTrigger, setGetOrderHistoryTrigger] = useState(false);
  const [modalClassname, setModalClassname] = useState(
    "h-[65%] md:h-[80%] w-full lg:w-[80%] bg-neutral-600 flex items-center justify-center rounded-md relative text-neutral-200"
  );

  // REDUX

  const mobileActive = useSelector(
    (state) => state.triggeri.value.mobileActive
  );

  // USEEFFECT
  useEffect(() => {
    setIsFetching(true);
    axios.get("/api/customer/get-order-history").then(({ data }) => {
      setOrderHistory(data.reverse());
      setIsFetching(false);
    });
  }, [getOrderHistoryTrigger]);

  console.log(orderHistory);
  return (
    <div className="h-full w-full bg-neutral-800 fl2 relative">
      <div className="h-[10%] w-full flex justify-center items-center">
        <h1 className="text-2xl text-neutral-300">Your order history:</h1>
      </div>
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
          modalClassname={modalClassname}
          setModalClassname={setModalClassname}
        />
      )}
      {isFetching ? (
        <div className="h-[90%] lg:h-[80%] w-[80%] shadow-lg overflow-scroll scrollbar-hide flex items-center justify-center">
          {" "}
          <img src={Loader} className="w-[15%] h-[15%] "></img>
        </div>
      ) : (
        <div className="h-[90%] w-full md:h-[90%] md:w-[80%] lg:h-[80%] shadow-lg overflow-scroll scrollbar-hide">
          {orderHistory && orderHistory.length > 0 ? (
            orderHistory.map((item, index) => {
              let indexMap = index;
              return item.productBought.map((item, index) => {
                if (index === 0) {
                  return (
                    <div
                      className="h-[20%] w-full bg-neutral-900 text-neutral-400 mt-2 flex cursor-pointer hover:bg-gray-500 hover:text-white transition-all rounded-md "
                      onClick={() => {
                        setModalClassname(
                          (prev) => prev + " orderModalAniOpen"
                        );
                        setIsVisible(true);
                        setIndex(indexMap);
                        setIndexDva(index);
                        setIdd(orderHistory[indexMap]._id);
                        setProductId(item._id);
                      }}
                      key={index}
                    >
                      <div className="w-[40%] md:w-[50%]  h-full flex md:p-2">
                        <div className="h-full w-[80%] md:w-[50%] p-4 ">
                          {" "}
                          <img
                            src={item.productPicture[0]}
                            className="h-full object-cover rounded-md w-full"
                          />
                        </div>
                        <div className="h-full w-[40%] lg:w-[70%] fl3 ml-4">
                          <h1 className="text-base md:text-xl lg:text-3xl text-white">
                            {item.productName.length > 15 && mobileActive
                              ? item.productName.slice(0, 15)
                              : item.productName}
                          </h1>

                          <p className="w-full overflow-hidden">
                            {item.productDescription}{" "}
                          </p>
                        </div>
                      </div>
                      <div className="h-full w-[20%] md:w-[20%] md:p-2">
                        <div className="h-full w-full border-l-2 border-neutral-600 border-opacity-20 fl2">
                          <h1 className="">Price paid</h1>
                          <h1 className=" text-2xl md:text-2xl lg:text-4xl text-white">
                            {item.productNewPrice}$
                          </h1>
                        </div>
                      </div>

                      <div className="w-[40%] md:w-[30%] h-full  md:p-2 border-l-2 border-neutral-600 border-opacity-20 relative fl2">
                        <h1 className="text-sm md:text-xl">Shippment Status</h1>
                        <div className="flex md:mt-2 text-white">
                          {orderHistory &&
                          orderHistory[indexMap].productShipped ? (
                            <>
                              <div className="bg-orange-500 p-2 rounded-md text-white flex">
                                <h1>Shipped</h1>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="w-4 h-6 md:w-6 md:h-6 ml-2"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                                  />
                                </svg>
                              </div>
                            </>
                          ) : (
                            <>
                              <h1 className="text-sm">Waiting to be shipped</h1>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-4 h-6 md:w-6 md:h-6 md:ml-2"
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
                      className="h-[20%] w-full beforeee relative bg-neutral-900 text-neutral-400 mt-2 flex cursor-pointer hover:bg-gray-500 hover:text-white transition-all rounded-md "
                      onClick={() => {
                        setModalClassname(
                          (prev) => prev + " orderModalAniOpen"
                        );
                        setIsVisible(true);
                        setIndex(indexMap);
                        setIndexDva(index);
                        setIdd(orderHistory[indexMap]._id);
                        setProductId(item._id);
                      }}
                    >
                      {}
                      <div className="w-[40%] md:w-[50%]  h-full flex md:p-2">
                        <div className="h-full w-[80%] md:w-[50%] p-4 ">
                          {" "}
                          <img
                            src={item.productPicture[0]}
                            className="h-full object-cover rounded-md w-full"
                          />
                        </div>

                        <div className="h-full w-[40%] lg:w-[70%] fl3 ml-4">
                          <h1 className="text-base md:text-xl lg:text-3xl text-white">
                            {item.productName.length > 15 && mobileActive
                              ? item.productName.slice(0, 15)
                              : item.productName}
                          </h1>

                          <p className="w-full overflow-hidden">
                            {item.productDescription}{" "}
                          </p>
                        </div>
                      </div>
                      <div className="h-full w-[20%] md:w-[20%] md:p-2">
                        <div className="h-full w-full border-l-2 border-neutral-600 border-opacity-20 fl2">
                          <h1 className="text-sm text-center md:text-base">
                            Price paid/
                            <br />
                            quantity
                          </h1>
                          <h1 className="text-xl md:text-2xl lg:text-4xl text-white">
                            {item.productNewPrice}$/
                            {orderHistory[indexMap].productQuantity[index]}
                          </h1>
                        </div>
                      </div>

                      <div className="w-[40%] md:w-[30%] h-full  md:p-2 border-l-2 border-neutral-600 border-opacity-20 relative fl2">
                        <h1 className="text-sm md:text-xl">Shippment Status</h1>
                        <div className="flex md:mt-2 text-white">
                          {orderHistory &&
                          orderHistory[indexMap].productShipped ? (
                            <>
                              <div className="bg-orange-500 p-2 rounded-md text-white flex">
                                <h1>Shipped</h1>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="w-4 h-6 md:w-6 md:h-6 ml-2"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                                  />
                                </svg>
                              </div>
                            </>
                          ) : (
                            <>
                              <h1 className="text-sm">Waiting to be shipped</h1>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-4 h-6 md:w-6 md:h-6 md:ml-2"
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
              <h1 className="text-gray-500 text-base md:text-xl">
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
