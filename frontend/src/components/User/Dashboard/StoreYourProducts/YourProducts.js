import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import StoreAddProductModal from "./Modals/AddProductModal/AddProductModal";
import StoreProductCard from "../../Store/StoreProductCard.js";
import StoreDeleteProductModal from "../StoreEdit/Modals/StoreDeleteProductModal";
import { setEditMode } from "../../../../app/features/Store/storeEditMode";
import StoreEditProductModal from "./Modals/EditProductModal/EditProductModal";
import { addStoreProducts } from "../../../../app/features/Store/storeProducts";
import axios from "axios";
import { setStoreProducts } from "../../../../app/features/Store/userStoreProducts";
import { setProducts } from "../../../../app/features/User/userSlice";
import AddCollectionModal from "./Modals/AddCollectionModal/AddCollectionModal.js";
import { collectionVisible } from "../../../../app/features/Store/collections";
const StoreAddProducts = () => {
  // states & ref
  const [isVisible, setIsVisible] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [items, setItems] = useState(null);
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  // redux
  const storeSubPage = useSelector((state) => state.storeSubPage.value);
  const userStoreProducts = useSelector(
    (state) => state.userData.value.products
  );
  const editProductModal = useSelector((state) => state.editProductModal.value);
  const collection = useSelector((state) => state.collection.value);
  const deleteProductModal = useSelector(
    (state) => state.deleteProductModal.value
  );
  const user = useSelector((state) => state.userData.value.user);
  const editMode = useSelector((state) => state.editMode.value);
  const dispatch = useDispatch();

  //other
  const styles = {
    backgroundImage: `url(${user.store.storeCover})`,
  };

  // functions
  function checkEditMode() {
    const checkbox = document.querySelector('.toggle input[type="checkbox"]');
    if (checkbox.checked === false) {
      checkbox.checked = true;
    }
  }
  function dragSetClassname(index) {
    let _storeProducts = [...userStoreProducts];
    let finalArray = [];
    _storeProducts.forEach((item) => {
      finalArray.push({ ...item, productDragged: false });
    });
    finalArray[index].productDragged = true;
    dispatch(setProducts(finalArray));
  }

  function handleSort() {
    /*let newArray = [...storeProducts];
    const slicedItem = storeProducts.splice(dragItem.current, 1)[0];
    newArray.splice(dragOverItem.current, 0, slicedItem);

    dragItem.current = null;
    dragOverItem.current = null;

    dispatch(addStoreProducts(newArray));*/
    let _storeProducts = [...userStoreProducts];
    const draggedItemContent = _storeProducts.splice(dragItem.current, 1)[0];
    _storeProducts.splice(dragOverItem.current, 0, draggedItemContent);

    dragItem.current = null;
    dragOverItem.current = null;
    let finalArray = [];
    _storeProducts.forEach((item) => {
      finalArray.push({ ...item, productDragged: false });
    });
    dispatch(setProducts(finalArray));
  }

  function handleSortSave() {
    axios.post("/api/store/save-sorted-products", {
      userStoreProducts,
    });
  }

  return (
    <div
      className={
        storeSubPage === "products"
          ? "absolute top-0 h-screen w-screen lg:absolute lg:left-[15%] store lg:h-full lg:top-0"
          : "hidden"
      }
    >
      {collection && <AddCollectionModal />}
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
        <div className=" h-[50px] w-[250px] toggle    flex items-center justify-center absolute top-0 left-2 z-40 text-white">
          <label className="switch transition-all  ">
            <input
              type="checkbox"
              className="hidden"
              onChange={() => {
                dispatch(setEditMode(!editMode));
                handleSortSave();
              }}
            />
            <span className={editMode ? "sliderOrange" : "slider"}></span>
          </label>
          <h1 className={editMode ? "mr-2 text-white " : "mr-2 "}>
            {editMode ? "Disable" : "Enable"} Edit Mode
          </h1>
        </div>{" "}
        <article className="w-[80%] h-[80%] fl2 z-40 gap-4">
          <button
            className="h-[25%] w-[50%] bg-orange-500 rounded-md text-white hover:scale-95 transition-all text-2xl "
            onClick={() => setIsVisible(true)}
          >
            {" "}
            Add Products{" "}
          </button>
          <button
            className="h-[25%] w-[50%] bg-orange-500 rounded-md text-white hover:scale-95 transition-all text-2xl"
            onClick={() => dispatch(collectionVisible(true))}
          >
            Edit collection
          </button>
        </article>
      </div>
      <div
        className={
          editMode
            ? "h-[55%] lg:h-[65%] w-full grid grid-cols-3 grid-rows-2 z-30 lg:grid-cols-6 p-2 overflow-scroll scrollbar-hide border-8 border-orange-500 transition-all relative"
            : "h-[55%] lg:h-[65%] w-full grid grid-cols-3 grid-rows-2 z-30 lg:grid-cols-6 p-2 overflow-scroll scrollbar-hide transition-all relative"
        }
      >
        <div
          className={
            editMode
              ? "hidden"
              : "h-full w-full absolute top-0 bg-black bg-opacity-20 z-20 transition-all cursor-pointer"
          }
          onClick={() => {
            dispatch(setEditMode(!editMode));
            checkEditMode();
          }}
        ></div>
        {userStoreProducts &&
          userStoreProducts.map((item, index) => {
            return (
              <>
                <div
                  className="relative"
                  onDragStart={() => {
                    dragItem.current = index;
                  }}
                  onDragEnter={(e) => {
                    dragOverItem.current = index;
                    dragSetClassname(index);
                  }}
                  onDragEnd={handleSort}
                >
                  <StoreProductCard storeProducts={item} />
                  {item.productDragged && (
                    <div className="drag-indicator "></div>
                  )}
                </div>
              </>
            );
          })}
      </div>
    </div>
  );
};

export default StoreAddProducts;
