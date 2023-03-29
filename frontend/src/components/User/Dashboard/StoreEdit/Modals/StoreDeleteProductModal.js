import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStoreDeleteVisible } from "../../../../../app/features/Store/deleteProductModal";
import axios from "axios";
import { switchValue } from "../../../../../app/features/getUserTrigger";
import Loader from "../../../../../assets/svg-loaders/three-dots.svg";

const StoreDeleteProductModal = () => {
  const [isFetching, setIsFetching] = useState(false);
  const deleteProductModal = useSelector(
    (state) => state.deleteProductModal.value
  );
  const getUserTrigger = useSelector((state) => state.getUserTrigger.value);
  const selectedProduct = useSelector((state) => state.selectedProduct.value);
  const dispatch = useDispatch();

  function deleteItem() {
    setIsFetching(true);
    axios
      .post("/api/store/delete-store-product", { selectedProduct })
      .then(() => {
        dispatch(switchValue(!getUserTrigger));
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
      <div className="w-[30%] h-[20%] fl2 bg-white rounded-xl text-black relative">
        <h1 className="text-2xl">
          Are you sure you want to delete this product?
        </h1>{" "}
        <div className="flex gap-8 w-full  justify-center mt-8">
          <button
            className="w-[20%] bg-white border-2 border-orange-500 border-opacity-20 text-black rounded-lg p-2 hover:scale-95 transition-all hover:bg-orange-500 hover:text-white"
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
