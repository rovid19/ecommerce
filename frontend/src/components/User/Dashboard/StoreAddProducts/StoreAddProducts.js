import React, { useState } from "react";
import { useSelector } from "react-redux";
import StoreAddProductModal from "./StoreAddProductModal";
import StoreProductCard from "../../Store/StoreProductCard.js";
import StoreDeleteProductModal from "../StoreEdit/StoreDeleteProductModal";

const StoreAddProducts = () => {
  const storeSubPage = useSelector((state) => state.storeSubPage.value);
  const storeProducts = useSelector((state) => state.storeProducts.value);
  const isStoreDeleteVisible = useSelector(
    (state) => state.isStoreDeleteVisible.value
  );

  const [isVisible, setIsVisible] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  console.log(isStoreDeleteVisible);
  return (
    <div
      className={
        storeSubPage === "products"
          ? "absolute left-[15%] store w-full h-full top-0"
          : "hidden"
      }
    >
      {isStoreDeleteVisible && <StoreDeleteProductModal />}
      {isVisible && (
        <StoreAddProductModal
          setIsVisible={setIsVisible}
          setIsFetching={setIsFetching}
        />
      )}

      <div className="h-[35%] w-full flex items-center justify-center    shadow-lg relative">
        <div className=" h-[50px] w-[150px] gap-2 flex items-center justify-center absolute top-0 left-0">
          <label className="switch transition-all  ">
            <input type="checkbox" />
            <span className="slider"></span>
          </label>
          <h1>Enable Edit Mode</h1>
        </div>{" "}
        <button
          className="h-[20%] w-[40%] bg-orange text-white text-2xl rounded-xl  transition-all  hover:scale-95"
          onClick={() => setIsVisible(true)}
        >
          {" "}
          Add Products{" "}
        </button>
      </div>
      <div className="h-[65%] w-full grid grid-cols-6 p-2 overflow-scroll scrollbar-hide">
        {storeProducts &&
          storeProducts.map((item) => {
            return <StoreProductCard storeProducts={item} />;
          })}
      </div>
    </div>
  );
};

export default StoreAddProducts;
