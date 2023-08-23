import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setEditProductModal } from "../../../../../../app/features/Store/Dashboard/editProductModal";
import EditProductInputs from "./EditProductInputs";
import Loader from "../../../../../../assets/svg-loaders/three-dots.svg";

const EditProductModal = () => {
  // STATES
  const [productPicture, setProductPicture] = useState([]);
  const [productTitle, setProductTitle] = useState(null);
  const [productDescription, setProductDescription] = useState(null);
  const [productPrice, setProductPrice] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [discountInput, setDiscountInput] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // REDUX
  const selectedProduct = useSelector((state) => state.selectedProduct.value);

  // OTHER
  const dispatch = useDispatch();

  // USEEFFECTS
  useEffect(() => {
    setIsFetching(true);
    axios
      .post("/api/store/get-current-product", { selectedProduct })
      .then(({ data }) => {
        setCurrentProduct(data);
        setProductPicture(data.productPicture);
        setProductTitle(data.productName);
        setProductDescription(data.productDescription);
        setProductPrice(data.productNewPrice);
        setDiscountInput(data.productOnSale);
      })
      .then(() => {
        setIsFetching(false);
      });
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center bg-neutral-900 bg-opacity-40 z-50 absolute top-0 left-0">
      {isFetching && (
        <div className="w-full h-full absolute top-0 bg-neutral-900 bg-opacity-50 left-0 flex items-center justify-center z-40">
          <img src={Loader}></img>
        </div>
      )}
      <div className="w-full h-[92%]  lg:w-[50%] lg:h-[95%] bg-neutral-800 p-4 rounded-lg lg:relative absolute top-0  z-50">
        <div className="h-[30px] ">
          <button onClick={() => dispatch(setEditProductModal(false))}>
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
        <EditProductInputs
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
          currentProduct={currentProduct}
          discountInput={discountInput}
          setDiscountInput={setDiscountInput}
        />
      </div>
    </div>
  );
};

export default EditProductModal;
