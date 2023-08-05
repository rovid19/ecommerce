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
  const { store } = user;
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

  console.log(userStoreProducts);
  return (
    <div
      className={
        storeSubPage === "products"
          ? " store h-full w-full bg-neutral-800  "
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
        <div className="h-full w-full bg-neutral-900 bg-opacity-50 absolute top-0 left-0"></div>
        {editMode && (
          <div className="w-full h-full bgneutral-900k bg-opacity-50 absolute top-0 left-0 z-20">
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
          <h1
            className={
              editMode ? "mr-2 text-neutral-400 " : "mr-2 text-neutral-400 "
            }
          >
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
      <section className="h-[65%] w-full overflow-scroll scrollbar-hide">
        {editMode && (
          <div className="absolute top-0 right-0 w-[15%] h-[10%] zeze bg-neutral-900 bg-opacity-80 rounded-l-md rounded-b-md text-white flex justify-center items-center p-2 group-hover:invisible">
            <h1 className="text-sm text-center">
              You can drag and drop your products
            </h1>
          </div>
        )}
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
        {store.storeCollections.map((collection, i) => {
          return (
            <article className="h-full w-full fl overflow-x-auto bg-neutral-800 ">
              <div className="h-[10%] p-4 text-xl uppercase font-bold bg-neutral-900 text-neutral-300">
                <h1>{collection}</h1>
              </div>
              <div className="h-[90%] min-w-min bg-neutral-800 gap-2 flex  ">
                {userStoreProducts.map((product) => {
                  if (product.productCollection === collection) {
                    return (
                      <div className="h-full w-[400px] flex items-center justify-center pt-4 pb-4 flex-shrink-0">
                        <StoreProductCard />
                      </div>
                    );
                  }
                })}
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
};

export default StoreAddProducts;
