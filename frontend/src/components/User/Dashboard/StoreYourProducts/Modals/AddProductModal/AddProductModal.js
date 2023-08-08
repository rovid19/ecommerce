import React, { useState } from "react";
import Loader from "../../../../../../assets/svg-loaders/three-dots.svg";
import AddProductInputs from "./AddProductInputs";

const StoreAddProductModal = ({ setIsVisible }) => {
  //states
  const [productPicture, setProductPicture] = useState([]);
  const [productTitle, setProductTitle] = useState(null);
  const [productDescription, setProductDescription] = useState(null);
  const [productPrice, setProductPrice] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  return (
    <div className="w-full h-full flex items-center justify-center bg-black bg-opacity-40 z-50 absolute top-0 left-0">
      {isFetching && (
        <div className="w-full h-full absolute top-0 bg-black bg-opacity-50 left-0 flex items-center justify-center z-40">
          <img src={Loader}></img>
        </div>
      )}
      <div className="w-full h-[92%]  lg:w-[50%] lg:h-[95%] bg-neutral-800 p-4 rounded-lg lg:relative absolute top-0  ">
        <div className="h-[30px] ">
          <button onClick={() => setIsVisible(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-neutral-300 rounded-md  hover:bg-orange-500 hover:text-white "
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <AddProductInputs
          setProductPicture={setProductPicture}
          setProductTitle={setProductTitle}
          setProductDescription={setProductDescription}
          setProductPrice={setProductPrice}
          setIsFetching={setIsFetching}
          productPrice={productPrice}
          productPicture={productPicture}
          productTitle={productTitle}
          productDescription={productDescription}
          setIsVisible={setIsVisible}
          isFetching={isFetching}
        />
      </div>
    </div>
  );
};

export default StoreAddProductModal;
