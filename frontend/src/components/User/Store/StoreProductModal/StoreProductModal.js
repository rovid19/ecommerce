import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setViewProductModal } from "../../../../app/features/Store/viewProductModal";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Loader from "../../../../assets/svg-loaders/three-dots.svg";

const StoreProductModal = () => {
  const [productPicture, setProductPicture] = useState([]);
  const [productTitle, setProductTitle] = useState(null);
  const [productDescription, setProductDescription] = useState(null);
  const [productPrice, setProductPrice] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [viewImage, setViewImage] = useState(false);
  const selectedProduct = useSelector((state) => state.selectedProduct.value);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsFetching(true);
    axios
      .post("/api/store/get-current-product", { selectedProduct })
      .then(({ data }) => {
        setProductPicture(data.productPicture);
        setProductTitle(data.productName);
        setProductDescription(data.productDescription);
        setProductPrice(data.productNewPrice);
      })
      .then(() => {
        setIsFetching(false);
      });
  }, []);

  console.log(productPicture);
  return (
    <div className="absolute top-0 z-20 left-0 h-full w-full bg-black bg-opacity-50 flex items-center justify-center ">
      <button
        onClick={() => dispatch(setViewProductModal(false))}
        className=" text-black absolute top-2 left-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-10 h-10 text-white hover:scale-95 opacity-50 hover:opacity-100"
        >
          <path
            fillRule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div className="w-[85%] h-full bg-white relative">
        {isFetching && (
          <div className="w-full h-full absolute top-0 left-0 z-30 bg-white flex items-center justify-center">
            {" "}
            <img src={Loader}></img>{" "}
          </div>
        )}
        {viewImage && (
          <div className="absolute top-0 left-0 h-full w-full z-30">
            <img
              src={productPicture}
              className="h-full w-full object-fill "
            ></img>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-16 h-16 absolute right-2 bottom-2 text-white cursor-pointer hover:scale-95"
              onClick={() => setViewImage(false)}
            >
              <path
                fillRule="evenodd"
                d="M2.515 10.674a1.875 1.875 0 000 2.652L8.89 19.7c.352.351.829.549 1.326.549H19.5a3 3 0 003-3V6.75a3 3 0 00-3-3h-9.284c-.497 0-.974.198-1.326.55l-6.375 6.374zM12.53 9.22a.75.75 0 10-1.06 1.06L13.19 12l-1.72 1.72a.75.75 0 101.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 101.06-1.06L15.31 12l1.72-1.72a.75.75 0 10-1.06-1.06l-1.72 1.72-1.72-1.72z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
        <div className="h-[50%] w-[75%] flex relative ">
          {productPicture.map((item, index) => {
            switch (index) {
              case 0:
                return (
                  <div className="h-full w-[50%] object-cover z-50 flex items-center relative">
                    <img src={item} className="h-full"></img>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      class="w-12 h-12 absolute right-2 text-white cursor-pointer hover:scale-95"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      class="w-12 h-12 absolute left-2 text-white cursor-pointer hover:scale-95"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                );
              case 1:
                return (
                  <img
                    src={item}
                    className="h-full w-[50%] object-cover absolute z-40 left-[10%]"
                  ></img>
                );
              case 2:
                return (
                  <img
                    src={item}
                    className="h-full w-[50%] object-cover absolute z-30 left-[20%] "
                  ></img>
                );
              case 3:
                return (
                  <img
                    src={item}
                    className="h-full w-[50%] object-cover absolute z-20 left-[30%] "
                  ></img>
                );
              case 4:
                return (
                  <img
                    src={item}
                    className="h-full w-[50%] object-cover absolute z-10 left-[40%] "
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
          <div className="h-full w-[50%] absolute left-[50%] bg-black bg-opacity-50 z-50"></div>
        </div>
        <div className="h-[50%] w-[75%]  p-4 relative">
          <h1 className="text-6xl">{productTitle}</h1>
          <p className="mt-4"> {productDescription}</p>
          <button className="bottom-4 bg-orange-500 p-4 rounded-lg text-white right-4 w-[25%] text-xl hover:w-[28%] transition-all absolute">
            Buy now
          </button>
          <div className="bottom-4 left-4 absolute">
            <h2 className="text-xl">4.5</h2>
          </div>
        </div>
        <div className="absolute right-0 top-0 h-full w-[25%] border-l-2 border-gray-300 border-opacity-25 ">
          <div className="h-[5%] text-3xl ml-4 mt-4">Reviews</div>
          <div className="h-[20%] bg-red-500 p-4 relative">
            <h1 className="text-xl">Jozef</h1>
            <p>jebene ide te</p>
            <h1 className="bottom-4 left-4 absolute">4.3</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreProductModal;
