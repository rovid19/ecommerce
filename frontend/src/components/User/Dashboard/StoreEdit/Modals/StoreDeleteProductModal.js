import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStoreDeleteVisible } from "../../../../../app/features/Store/deleteProductModal";
import axios from "axios";
import Loader from "../../../../../assets/svg-loaders/three-dots.svg";
import { fetchUserData } from "../../../../../app/features/User/userSlice";

const StoreDeleteProductModal = () => {
  // STATES
  const [isFetching, setIsFetching] = useState(false);

  // REDUX
  const deleteProductModal = useSelector(
    (state) => state.deleteProductModal.value
  );
  const selectedProduct = useSelector((state) => state.selectedProduct.value);

  // OTHER
  const dispatch = useDispatch();

  // FUNCTIONS
  function deleteItem() {
    setIsFetching(true);
    axios
      .post("/api/store/delete-store-product", { selectedProduct })
      .then(() => {
        dispatch(fetchUserData());
      })
      .then(() => {
        dispatch(setStoreDeleteVisible(!deleteProductModal));
        setIsFetching(false);
      });
  }

  return (
    <div className="w-full h-full  flex items-center justify-center bg-black bg-opacity-40 z-50 absolute top-0 left-0">
      {isFetching && (
        <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <img src={Loader}></img>
        </div>
      )}
      <div className="w-[90%] md:w-[60%] h-[25%] lg:w-[50%] lg:h-[20%] 2xl:w-[35%] fl2 bg-neutral-800 rounded-xl text-neutral-300 relative">
        <h1 className="text-base lg:text-2xl">
          Are you sure you want to delete this product?
        </h1>{" "}
        <div className="flex gap-8 w-full  justify-center mt-8">
          <button
            className="w-[20%] bg-neutral-800 text-neutral-300 border-2 border-orange-500 border-opacity-20  rounded-lg p-2 hover:scale-95 transition-all hover:bg-orange-500 hover:text-white"
            onClick={deleteItem}
          >
            Yes{" "}
          </button>
          <button
            className="w-[20%] bg-orange-400 text-white rounded-lg p-2  hover:scale-95 transition-all"
            onClick={() => dispatch(setStoreDeleteVisible(!deleteProductModal))}
          >
            No{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoreDeleteProductModal;
