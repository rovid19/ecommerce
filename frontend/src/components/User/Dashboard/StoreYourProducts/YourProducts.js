import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import StoreAddProductModal from "./Modals/AddProductModal/AddProductModal";
import StoreProductCard from "../../Store/StoreProductCard.js";
import StoreDeleteProductModal from "../StoreEdit/Modals/StoreDeleteProductModal";
import { setEditMode } from "../../../../app/features/Store/storeEditMode";
import StoreEditProductModal from "./Modals/EditProductModal/EditProductModal";
import axios from "axios";
import { fetchUserData } from "../../../../app/features/User/userSlice";
import AddCollectionModal from "./Modals/AddCollectionModal/AddCollectionModal.js";
import { collectionVisible } from "../../../../app/features/Store/collections";

const StoreAddProducts = () => {
  // states & ref
  const [isVisible, setIsVisible] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState(null);
  const [collectionProd, setCollectionProd] = useState(null);
  const [collectionId, setCollectionId] = useState(null);
  const [collectionNewOrder, setCollectionNewOrder] = useState([]);
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  // redux
  const editProductModal = useSelector((state) => state.editProductModal.value);
  const collection = useSelector((state) => state.collection.value);
  const deleteProductModal = useSelector(
    (state) => state.deleteProductModal.value
  );
  const mobileActive = useSelector(
    (state) => state.triggeri.value.mobileActive
  );
  const user = useSelector((state) => state.userData.value.user);
  const editMode = useSelector((state) => state.editMode.value);
  const dispatch = useDispatch();

  //postavljanje slike
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

  //stavljanje dragged propertije productu preko kojeg trenutno hoveras misem
  function dragSetClassname(index) {
    //trazenje index kolekcije
    let indexKolekcije = null;
    collectionProd.forEach((collection, index) => {
      if (collection.collectionName === newCollectionName) {
        indexKolekcije = index;
      }
    });

    let kolekcija = [collectionProd[indexKolekcije]];
    let newProducts = [];

    // stavljanje propetije isdragged na proizvode odabrane kolekcije
    kolekcija[0].collectionProducts.forEach((item) => {
      newProducts.push({ ...item, productDragged: false });
    });
    let finalCollectionArray = [];
    newProducts[index].productDragged = true;

    //postavljanje finalnog arraya s novim propertijima na odabranoj kolekciji
    collectionProd.forEach((array, index) => {
      if (index === indexKolekcije) {
        let newArr = { ...array };

        newArr.collectionProducts = newProducts;

        finalCollectionArray.push(newArr);
      } else {
        finalCollectionArray.push(array);
      }
    });

    setCollectionProd(finalCollectionArray);
  }

  function handleSort() {
    //trazenje kolekcije
    let productCollection = null;
    user.store.storeCollections.forEach((collection) => {
      if (collection.collectionName === newCollectionName) {
        return (productCollection = [...collection.collectionProducts]);
      }
    });

    //uzimanje producta iz arraya i postavljanje producta na novu poziciju u arrayu
    const draggedItemContent = productCollection.splice(dragItem.current, 1)[0];
    console.log(draggedItemContent, dragItem.current);
    productCollection.splice(dragOverItem.current, 0, draggedItemContent);

    dragItem.current = null;
    dragOverItem.current = null;
    setCollectionNewOrder(productCollection);
  }

  const findCollectionIndex = () => {
    collectionProd.forEach((collection) => {
      if (collection.collectionName === newCollectionName) {
        setCollectionId(collection._id);
      }
    });
  };

  useEffect(() => {
    if (collectionId) {
      handleSort();
    }
  }, [collectionId]);

  useEffect(() => {
    if (collectionNewOrder.length > 0) {
      handleSortSave();
    }
  }, [collectionNewOrder]);

  //spremanje novog arraya u backend
  async function handleSortSave() {
    let data = await axios.post("/api/store/save-sorted-products", {
      collectionNewOrder,
      collectionId,
    });

    setCollectionProd(data.data.storeCollections);
    setCollectionNewOrder([]);
    setCollectionId(null);
    dispatch(fetchUserData());
  }

  //postavljanje kolekcija na state unutar componenta
  useEffect(() => {
    setCollectionProd(user.store.storeCollections);
  }, [user]);

  return (
    <div
      className={
        editMode
          ? " store h-full w-full bg-neutral-800 overflow-hidden  "
          : " store h-full w-full bg-neutral-800  "
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
            className="h-[25%] w-[60%] lg:w-[50%] bg-orange-500 rounded-md text-white hover:scale-95 transition-all text-xl lg:text-2xl "
            onClick={() => setIsVisible(true)}
          >
            {" "}
            Add Products{" "}
          </button>
          <button
            className="h-[25%] w-[60%] lg:w-[50%] bg-orange-500 rounded-md text-white hover:scale-95 transition-all text-xl lg:text-2xl"
            onClick={() => dispatch(collectionVisible(true))}
          >
            Edit collection
          </button>
        </article>
      </div>
      <section
        className={
          editMode
            ? "h-[55%] lg:h-[65%] w-full overflow-scroll scrollbar-hide relative border-[8px] border-orange-500 transition-all"
            : "h-[55%] lg:h-[65%] w-full overflow-hidden relative transition-all "
        }
      >
        {editMode && (
          <div className="absolute top-0 right-0 w-[70%] lg:w-[30%] 2xl:w-[25%] h-[13%] lg:h-[9%] z-40 bg-neutral-900 bg-opacity-80 rounded-l-md rounded-b-md text-white flex  items-center p-2 group-hover:invisible">
            <h1 className="text-sm  absolute top-0 right-4 text-neutral-500 h-full flex items-center ">
              {mobileActive
                ? "You can drag and drop a product"
                : "You can drag and drop your products to rearrange their order"}
            </h1>
          </div>
        )}
        <div
          className={
            editMode
              ? "hidden"
              : "h-full w-full absolute top-0 bg-black bg-opacity-50 z-20 transition-all cursor-pointer flex items-center justify-center group"
          }
        >
          <button
            className="w-[70%] h-[25%] text-xl lg:w-[25%] lg:h-[20%] bg-orange-500 text-white lg:text-3xl rounded-lg opacity-0 group-hover:opacity-100 hover:scale-95  transition-all"
            onClick={() => {
              dispatch(setEditMode(!editMode));
              checkEditMode();
            }}
          >
            Enable edit mode
          </button>
        </div>
        {collectionProd &&
          collectionProd.map((collection, i) => {
            return (
              <article className="h-full w-full fl overflow-x-auto bg-neutral-800 ">
                <div className="h-[15%] lg:h-[10%]"></div>
                <div className="h-full min-w-min bg-neutral-800 gap-4 flex p-4  relative">
                  <div className="h-[15%] lg:h-[10%] w-full absolute top-[-15%] lg:top-[-10%] left-0 p-2 lg:p-3 text-xl uppercase font-bold bg-neutral-900 text-neutral-300">
                    <h1>{collection.collectionName}</h1>
                  </div>
                  {collection.collectionProducts &&
                    collection.collectionProducts.map((product, index) => {
                      return (
                        <div
                          className="h-full w-[200px] lg:w-[300px] flex items-center justify-center pt-4 pb-4 flex-shrink-0 relative"
                          key={index}
                          onDragStart={() => {
                            dragItem.current = index;
                            console.log(index);
                            setNewCollectionName(product.productCollection);
                          }}
                          onDragEnter={(e) => {
                            dragOverItem.current = index;
                            console.log(index);
                            dragSetClassname(index);
                          }}
                          onDragEnd={findCollectionIndex}
                        >
                          <StoreProductCard storeProducts={product} />
                          {product.productDragged && (
                            <div className="h-[95%] rounded-md w-[8%]  zeze bg-neutral-300 bg-opacity-80 absolute right-0 top-3 "></div>
                          )}
                        </div>
                      );
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
