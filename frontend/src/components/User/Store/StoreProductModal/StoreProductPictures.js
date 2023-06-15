import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setviewImage } from "../../../../app/features/User/viewImage";

const StoreProductPictures = ({
  storeProducts,
  productIndex,
  viewImage,
  setViewImage,
  isFetching,
  productPicture,
  setProductPicture,
}) => {
  const dispatch = useDispatch();
  //functions

  function handleChangePictureNext(index) {
    console.log("da");
    return function () {
      let newArray = [...productPicture];
      const arrayEnd = newArray.length;

      const splicedItem = newArray.splice(index, 1);

      newArray.splice(arrayEnd, 0, splicedItem[0]);
      setProductPicture(newArray);
    };
  }

  function handleChangePicturePrevious(index) {
    return function () {
      let newArray = [...productPicture];
      const arrayEnd = newArray.length - 1;
      const splicedItem = newArray.splice(arrayEnd, 1);
      newArray.splice(0, 0, splicedItem);
      setProductPicture(newArray);
    };
  }
  return (
    <>
      {/* PRODUCT PICTURES */}
      <div className={viewImage ? "hidden " : "h-[50%] w-[75%] flex relative "}>
        {storeProducts.length > 0
          ? productPicture.map((item, index) => {
              switch (index) {
                case 0:
                  return (
                    <div className="h-full w-[50%] object-cover z-50 flex items-center relative ">
                      <button className="absolute top-4 left-4 z-30">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 text-white hover:scale-95 transition-all"
                          onClick={() => dispatch(setviewImage(true))}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                          />
                        </svg>
                      </button>
                      <img
                        src={item}
                        className="h-full w-full object-cover"
                      ></img>
                      <button onClick={handleChangePictureNext(index)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          class="w-14 h-14 absolute right-2 text-white cursor-pointer hover:scale-95"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </button>
                      <button onClick={handleChangePicturePrevious(index)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          class="w-14 h-14 absolute left-2 text-white cursor-pointer hover:scale-95"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  );
                case 1:
                  return (
                    <img
                      src={item}
                      className={
                        storeProducts[productIndex].productPicture.length === 2
                          ? "h-full w-[50%] object-cover absolute z-40 left-[50%]"
                          : storeProducts[productIndex].productPicture
                              .length === 3
                          ? "h-full w-[50%] object-cover absolute z-40 left-[25%]"
                          : storeProducts[productIndex].productPicture
                              .length === 4
                          ? "h-full w-[50%] object-cover absolute z-40 left-[16.6%]"
                          : storeProducts[productIndex].productPicture
                              .length === 5
                          ? "h-full w-[50%] object-cover absolute z-40 left-[12.5%]"
                          : storeProducts[productIndex].productPicture
                              .length === 6
                          ? "h-full w-[50%] object-cover absolute z-40 left-[10%]"
                          : ""
                      }
                    ></img>
                  );
                case 2:
                  return (
                    <img
                      src={item}
                      className={
                        storeProducts[productIndex].productPicture.length === 3
                          ? "h-full w-[50%] object-cover absolute z-30 left-[50%]"
                          : storeProducts[productIndex].productPicture
                              .length === 4
                          ? "h-full w-[50%] object-cover absolute z-30 left-[33.2%]"
                          : storeProducts[productIndex].productPicture
                              .length === 5
                          ? "h-full w-[50%] object-cover absolute z-30 left-[25%]"
                          : storeProducts[productIndex].productPicture
                              .length === 6
                          ? "h-full w-[50%] object-cover absolute z-30 left-[20%]"
                          : ""
                      }
                    ></img>
                  );
                case 3:
                  return (
                    <img
                      src={item}
                      className={
                        storeProducts[productIndex].productPicture.length === 4
                          ? "h-full w-[50%] object-cover absolute z-20 left-[50%]"
                          : storeProducts[productIndex].productPicture
                              .length === 5
                          ? "h-full w-[50%] object-cover absolute z-20 left-[37.5%]"
                          : storeProducts[productIndex].productPicture
                              .length === 6
                          ? "h-full w-[50%] object-cover absolute z-20 left-[30%]"
                          : ""
                      }
                    ></img>
                  );
                case 4:
                  return (
                    <img
                      src={item}
                      className={
                        storeProducts[productIndex].productPicture.length === 5
                          ? "h-full w-[50%] object-cover absolute z-10 left-[50%]"
                          : storeProducts[productIndex].productPicture
                              .length === 6
                          ? "h-full w-[50%] object-cover absolute z-10 left-[40%]"
                          : ""
                      }
                    ></img>
                  );
                case 5:
                  return (
                    <img
                      src={item}
                      className="h-full w-[50%] object-cover absolute z-0 left-[50%] "
                    ></img>
                  );
              }
            })
          : isFetching
          ? ""
          : productPicture &&
            productPicture.map((item, index) => {
              switch (index) {
                case 0:
                  return (
                    <div className="h-full w-[50%] object-cover z-50 flex items-center relative ">
                      <button className="absolute top-4 left-4 z-30">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 text-white hover:scale-95 transition-all"
                          onClick={() => dispatch(setviewImage(true))}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                          />
                        </svg>
                      </button>
                      <img
                        src={item}
                        className="h-full w-full object-cover"
                      ></img>
                      <button onClick={handleChangePictureNext(index)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          class="w-14 h-14 absolute right-2 text-white cursor-pointer hover:scale-95"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </button>
                      <button onClick={handleChangePicturePrevious(index)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          class="w-14 h-14 absolute left-2 text-white cursor-pointer hover:scale-95"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  );
                case 1:
                  return (
                    <img
                      src={item}
                      className={
                        productPicture && productPicture.length === 2
                          ? "h-full w-[50%] object-cover absolute z-40 left-[50%]"
                          : productPicture && productPicture.length === 3
                          ? "h-full w-[50%] object-cover absolute z-40 left-[25%]"
                          : productPicture && productPicture.length === 4
                          ? "h-full w-[50%] object-cover absolute z-40 left-[16.6%]"
                          : productPicture && productPicture.length === 5
                          ? "h-full w-[50%] object-cover absolute z-40 left-[12.5%]"
                          : productPicture && productPicture.length === 6
                          ? "h-full w-[50%] object-cover absolute z-40 left-[10%]"
                          : ""
                      }
                    ></img>
                  );
                case 2:
                  return (
                    <img
                      src={item}
                      className={
                        productPicture && productPicture.length === 3
                          ? "h-full w-[50%] object-cover absolute z-30 left-[50%]"
                          : productPicture && productPicture.length === 4
                          ? "h-full w-[50%] object-cover absolute z-30 left-[33.2%]"
                          : productPicture && productPicture.length === 5
                          ? "h-full w-[50%] object-cover absolute z-30 left-[25%]"
                          : productPicture && productPicture.length === 6
                          ? "h-full w-[50%] object-cover absolute z-30 left-[20%]"
                          : ""
                      }
                    ></img>
                  );
                case 3:
                  return (
                    <img
                      src={item}
                      className={
                        productPicture &&
                        productPicture &&
                        productPicture.length === 4
                          ? "h-full w-[50%] object-cover absolute z-20 left-[50%]"
                          : productPicture &&
                            productPicture &&
                            productPicture.length === 5
                          ? "h-full w-[50%] object-cover absolute z-20 left-[37.5%]"
                          : productPicture &&
                            productPicture &&
                            productPicture.length === 6
                          ? "h-full w-[50%] object-cover absolute z-20 left-[30%]"
                          : ""
                      }
                    ></img>
                  );
                case 4:
                  return (
                    <img
                      src={item}
                      className={
                        productPicture && productPicture.length === 5
                          ? "h-full w-[50%] object-cover absolute z-10 left-[50%]"
                          : productPicture && productPicture.length === 6
                          ? "h-full w-[50%] object-cover absolute z-10 left-[40%]"
                          : ""
                      }
                    ></img>
                  );
                case 5:
                  return (
                    <img
                      src={item}
                      className="h-full w-[50%] object-cover absolute z-0 left-[50%] "
                    ></img>
                  );
              }
            })}
        {/* BLACK OVERLAY OVER PICTURES */}
        <div className="h-full w-[50%] absolute left-[50%] bg-black  bg-opacity-60 z-40"></div>
      </div>
    </>
  );
};

export default StoreProductPictures;