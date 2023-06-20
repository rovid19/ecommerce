import React, { useEffect, useState } from "react";
import StoreProductCard from "../Store/StoreProductCard.js";
import { useDispatch, useSelector } from "react-redux";
import StoreProductModal from "./StoreProductModal/StoreProductModal";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../../../assets/svg-loaders/three-dots.svg";
import { setStoreId } from "../../../app/features/Store/storeId.js";
import { addStoreProducts } from "../../../app/features/Store/storeProducts.js";
import { getStoreSubPage } from "../../../app/features/storeSubPage.js";
import { setSavedStore } from "../../../app/features/Store/savedStore.js";
import { addCollectionItems } from "../../../app/features/Store/collections.js";

const Store = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [storeData, setStoreData] = useState(null);
  const [storeItems, setStoreItems] = useState(null);
  const { storeid } = useParams();
  const user = useSelector((state) => state.userData.value.user);
  const storeProducts = useSelector((state) => state.storeProducts.value);
  const storeSubPage = useSelector((state) => state.storeSubPage.value);
  const cartItems = useSelector((state) => state.cartItems.value);
  const viewProductModal = useSelector((state) => state.viewProductModal.value);
  const collection = useSelector((state) => state.collection.collectionItems);
  const styles = {
    backgroundImage: storeData && `url(${storeData.storeCover})`,
  };
  const dispatch = useDispatch();

  useEffect(() => {
    setIsFetching(true);
    axios.post("/api/store/fetch-store-data", { storeid }).then(({ data }) => {
      setStoreData(data);
      setStoreItems(data.storeProducts);
      setIsFetching(false);
      dispatch(setStoreId(storeid));
      dispatch(addStoreProducts(data.storeProducts));
      dispatch(getStoreSubPage("store"));
      dispatch(setSavedStore(data));
      dispatch(addCollectionItems(data.storeCollections));
    });
  }, [storeid]);

  return (
    <main className="w-[100%]  bg-gray-50 skrin flex justify-center relative ">
      {isFetching && (
        <div className="flex items-center justify-center absolute top-0 left-0 w-full h-full z-50 bg-white">
          <img src={Loader} className="h-24 w-[400px] object-cover"></img>
        </div>
      )}
      {viewProductModal && <StoreProductModal />}
      <section className=" w-[100%] lg:w-[85%]">
        <div className="h-[35%] relative bg-cover">
          <img
            src={storeData && storeData.storeCover}
            className=" h-full w-full object-cover"
          ></img>
          <div className="h-full w-full bg-black bg-opacity-40 absolute top-0">
            <div className="text-white absolute bottom-[25%] left-[20%] lg:left-[15%] xl:left-[12%] lg:bottom-[10%] bg-black p-4 rounded-xl z-50">
              <h1 className="text-xl lg:text-3xl">
                {storeData && storeData.storeName}
              </h1>
              <h3 className="text-gray-400 text-sm lg:text-base">
                {storeData && storeData.storeAddress}
              </h3>
              <p className="text-sm lg:text-base">
                {storeData && storeData.storeDescription}
              </p>{" "}
            </div>
          </div>
          <img
            src={storeData && storeData.storeProfile}
            className="h-28 w-[10%] absolute bottom-4 left-2 lg:h-36 lg:left-4 rounded-xl shadow-xl object-cover"
          ></img>
        </div>
        <section className="h-[65%] grid grid-cols-3 2xl:grid-cols-6">
          {storeProducts &&
            storeProducts.map((item, index) => {
              return (
                <StoreProductCard
                  storeProducts={item}
                  index={index}
                  storeData={storeData}
                />
              );
            })}
        </section>
      </section>
    </main>
  );
};

export default Store;
