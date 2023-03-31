import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StoreAddProductModal from "./Modals/AddProductModal/AddProductModal";
import StoreProductCard from "../../Store/StoreProductCard.js";
import StoreDeleteProductModal from "../StoreEdit/Modals/StoreDeleteProductModal";
import { setEditMode } from "../../../../app/features/Store/storeEditMode";
import StoreEditProductModal from "./Modals/EditProductModal/EditProductModal";

const StoreAddProducts = () => {
  //states
  const [isVisible, setIsVisible] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  // redux
  const storeSubPage = useSelector((state) => state.storeSubPage.value);
  const storeProducts = useSelector((state) => state.storeProducts.value);
  const editProductModal = useSelector((state) => state.editProductModal.value);
  const deleteProductModal = useSelector(
    (state) => state.deleteProductModal.value
  );
  const user = useSelector((state) => state.user.value);
  const styles = {
    backgroundImage: `url(${user.store.storeCover})`,
  };
  const editMode = useSelector((state) => state.editMode.value);
  const dispatch = useDispatch();

  return (
    <div
      className={
        storeSubPage === "products"
          ? "absolute top-0 h-screen w-screen lg:absolute lg:left-[15%] store lg:h-full lg:top-0"
          : "hidden"
      }
    >
      {editProductModal && <StoreEditProductModal />}
      {deleteProductModal && <StoreDeleteProductModal />}
      {isVisible && (
        <StoreAddProductModal
          setIsVisible={setIsVisible}
          setIsFetching={setIsFetching}
        />
      )}

      <div
        className="h-[35%] w-full flex items-center justify-center bg-cover   shadow-lg relative"
        style={styles}
      >
        <div className="h-full w-full bg-black bg-opacity-50 absolute top-0 left-0"></div>
        {editMode && (
          <div className="w-full h-full bg-black bg-opacity-50 absolute top-0 left-0 z-20">
            {" "}
          </div>
        )}
        <div className=" h-[50px] w-[250px]    flex items-center justify-center absolute top-0 left-2 z-40 text-white">
          <label className="switch transition-all  ">
            <input
              type="checkbox"
              className="hidden"
              onChange={() => dispatch(setEditMode(!editMode))}
            />
            <span className={editMode ? "sliderOrange" : "slider"}></span>
          </label>
          <h1 className={editMode ? "mr-2 text-white " : "mr-2 "}>
            {editMode ? "Disable" : "Enable"} Edit Mode
          </h1>
        </div>{" "}
        <button
          className="h-[20%] w-[40%] bg-orange-500 text-white text-2xl rounded-xl z-10 transition-all  hover:scale-95"
          onClick={() => setIsVisible(true)}
        >
          {" "}
          Add Products{" "}
        </button>
      </div>
      <div
        className={
          editMode
            ? "h-[65%] w-full grid grid-cols-6 p-2 overflow-scroll scrollbar-hide border-8 border-orange-500 transition-all relative"
            : "h-[65%] w-full grid grid-cols-6 p-2 overflow-scroll scrollbar-hide transition-all relative"
        }
      >
        <div
          className={
            editMode
              ? "hidden"
              : "h-full w-full absolute top-0 bg-black bg-opacity-20 z-20 transition-all cursor-pointer"
          }
          onClick={() => dispatch(setEditMode(!editMode))}
        ></div>
        {storeProducts &&
          storeProducts.map((item) => {
            return <StoreProductCard storeProducts={item} />;
          })}
      </div>
    </div>
  );
};

export default StoreAddProducts;
