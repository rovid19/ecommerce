import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setEditProductModal } from "../../../../../../app/features/Store/Dashboard/editProductModal";
import EditProductInputs from "./EditProductInputs";
import Loader from "../../../../../../assets/svg-loaders/three-dots.svg";

const EditProductModal = () => {
  //states
  const [productPicture, setProductPicture] = useState(undefined);
  const [productTitle, setProductTitle] = useState(null);
  const [productDescription, setProductDescription] = useState(null);
  const [productPrice, setProductPrice] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  //redux
  const selectedProduct = useSelector((state) => state.selectedProduct.value);
  const dispatch = useDispatch();

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
      })
      .then(() => {
        setIsFetching(false);
      });
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center bg-black bg-opacity-40 z-50 absolute top-0 left-0">
      {isFetching && (
        <div className="w-full h-full absolute top-0 bg-black bg-opacity-50 left-0 flex items-center justify-center z-40">
          <img src={Loader}></img>
        </div>
      )}
      <div className="w-[85%] h-[70%]  lg:w-[35%] lg:h-[70%] bg-white p-4 rounded-lg relative  ">
        <div className="h-[5%] ">
          <button onClick={() => dispatch(setEditProductModal(false))}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-6 h-6 bg-orange-500 rounded-sm text-white hover:scale-90 transition-all "
            >
              <path
                fill-rule="evenodd"
                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                clip-rule="evenodd"
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
        />
      </div>
    </div>
  );
};

export default EditProductModal;
