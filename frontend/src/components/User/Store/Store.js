import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
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
import { setScrollStop } from "../../../app/features/Store/scrollStop.js";

const Store = () => {
  // STATES
  const [isFetching, setIsFetching] = useState(false);
  const [storeData, setStoreData] = useState(null);
  const [storeItems, setStoreItems] = useState(null);
  const [trigger, setTrigger] = useState(false);
  const [productCollections, setProductCollections] = useState([]);

  // REDUX
  const storeProducts = useSelector((state) => state.storeProducts.value);
  const viewProductModal = useSelector((state) => state.viewProductModal.value);
  const scrollStop = useSelector((state) => state.scrollStop.value);
  const collection = useSelector((state) => state.collection.collectionItems);
  const dispatch = useDispatch();

  const { storeid } = useParams();

  // USEEFFECT
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
      setTrigger(!trigger);
    });
  }, [storeid]);

  useEffect(() => {
    if (trigger) {
      handleStoreCollections();
    }
  }, [trigger]);

  // Set scroll height to state
  useEffect(() => {
    const handleScroll = () => {
      dispatch(setScrollStop(window.scrollY));
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // When closing store product modal, go back to where you left from
  useEffect(() => {
    if (scrollStop) {
      setTimeout(() => {
        window.scrollTo({ top: scrollStop, left: 0, behavior: "smooth" });
        console.log("dada");
      }, [500]);
    }
  }, [viewProductModal]);

  // FUNCTIONS

  // sort out products by their collection
  function handleStoreCollections() {
    const newArray = [];
    collection.forEach((collection, index) => {
      const productArray = storeProducts.filter(
        (product) => product.productCollection === collection
      );

      newArray.push(productArray);
    });
    setProductCollections(newArray);
  }
  console.log(scrollStop);
  return (
    <>
      <main className="w-[100%]  h-full  relative  ">
        {isFetching && (
          <div className="flex items-center justify-center absolute top-0 left-0 w-full h-full z-50 bg-white">
            <img src={Loader} className="h-24 w-[400px] object-cover"></img>
          </div>
        )}

        <div className="h-[50%] relative bg-cover">
          <img
            src={storeData && storeData.storeCover}
            className=" h-full w-full object-cover"
          ></img>
          <div className="h-full w-full bg-black bg-opacity-40 absolute top-0">
            <div className="text-white absolute bottom-[25%] left-[20%] lg:left-[15%] xl:left-[12%] lg:bottom-[10%] bg-neutral-900 p-4 rounded-xl z-50">
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
        <div className="h-[50%] overflow-scroll scrollbar-hide">
          {productCollections &&
            productCollections.map((item, index) => {
              return (
                <article key={index} className="h-full relative">
                  <h1 className=" text-2xl h-[40px] bg-neutral-900 text-neutral-400   pl-4 pt-1    ">
                    {collection[index]}
                  </h1>

                  <div className="h-[calc(100%-40px)] w-full grid grid-cols-6 gap-4 p-4 bg-neutral-800 scrollbar-hide  ">
                    {item &&
                      item.map((product, index) => {
                        return (
                          <article className="mt-2 mb-2">
                            <StoreProductCard
                              storeProducts={product}
                              index={index}
                              storeData={storeData}
                              key={index}
                            />
                          </article>
                        );
                      })}
                  </div>
                </article>
              );
            })}
        </div>
      </main>
      {/*productCollections.length > 2 && (
        <section className="h-screen grid grid-rows-2 bg-whitew-full place-items-center overflow-scroll">
          <div className="h-full w-[85%] ">
            {productCollections &&
              productCollections.map((item, index) => {
                if (index > 0) {
                  return (
                    <article key={index} className="h-full relative ">
                      <h1 className=" text-2xl h-[40px] bg-gray-500 text-white rouned-md  pl-4 pt-1 hover:text-white hover:bg-gray-500 transition-all cursor-pointer rounded-md">
                        {collection[index]}
                      </h1>

                      <div
                        className={
                          item.length === 0
                            ? "h-[calc(100%-40px)] w-full bg-gray-50 border-r-2 border-l-2 border-gray-300 border-opacity-20 p-4"
                            : "h-[calc(100%-40px)] w-full grid grid-cols-6 gap-4 bg-gray-50 border-r-2 border-l-2 border-gray-300 border-opacity-20 p-4"
                        }
                      >
                        {item.length === 0 && (
                          <div className="w-full h-full flex justify-center items-center ">
                            <h1 className="text-black text-3xl">
                              There's no products in this collection
                            </h1>
                          </div>
                        )}
                        {item &&
                          item.map((product, index) => {
                            return (
                              <article className="mt-2 mb-2">
                                <StoreProductCard
                                  storeProducts={product}
                                  index={index}
                                  storeData={storeData}
                                  key={index}
                                />
                              </article>
                            );
                          })}
                      </div>
                    </article>
                  );
                }
              })}
          </div>
        </section>
      )*/}
    </>
  );
};

export default Store;
