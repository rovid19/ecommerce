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
import StoreFeed from "./StoreFeed.js";

const Store = () => {
  // STATES
  const [isFetching, setIsFetching] = useState(false);
  const [storeData, setStoreData] = useState(null);
  const [storeItems, setStoreItems] = useState(null);
  const [trigger, setTrigger] = useState(false);
  const [productCollections, setProductCollections] = useState([]);
  const [active, setActive] = useState("Store");
  const [storeDataTrigger, setStoreDataTrigger] = useState(false);
  const [storeUser, setStoreUser] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  // REDUX
  const user = useSelector((state) => state.userData.value.user);
  const storeProducts = useSelector((state) => state.storeProducts.value);
  const viewProductModal = useSelector((state) => state.viewProductModal.value);
  const scrollStop = useSelector((state) => state.scrollStop.value);
  const collection = useSelector((state) => state.collection.collectionItems);
  const dispatch = useDispatch();

  const { storeid } = useParams();
  const containerRef = useRef(null);

  // USEEFFECT
  useEffect(() => {
    setIsFetching(true);
    axios.post("/api/store/fetch-store-data", { storeid }).then(({ data }) => {
      setStoreData(data.store);
      setStoreItems(data.store.storeProducts);
      setIsFetching(false);
      dispatch(setStoreId(storeid));
      dispatch(addStoreProducts(data.store.storeProducts));
      dispatch(getStoreSubPage("store"));
      dispatch(setSavedStore(data.store));
      dispatch(addCollectionItems(data.store.storeCollections));
      setStoreUser(data.user);
      setTrigger(true);
    });
  }, [storeid, storeDataTrigger]);

  useEffect(() => {
    if (trigger) {
      handleStoreCollections();
      if (storeUser.followers.includes(user._id)) {
        setIsFollowing(true);
      } else {
        setIsFollowing(false);
      }
      setTrigger(false);
    }
  }, [trigger]);

  // Set scroll height to state
  useEffect(() => {
    let scroll = 0;
    const handleScroll = () => {
      if (containerRef.current.scrollTop > scroll) {
        dispatch(setScrollStop(scroll));
        scroll = containerRef.current.scrollTop;
      } else {
        dispatch(setScrollStop(scroll));
        scroll = containerRef.current.scrollTop;
      }
    };
    containerRef.current.addEventListener("scroll", handleScroll);
  }, []);

  // When closing store product modal, scroll back to where you left from
  useEffect(() => {
    if (scrollStop) {
      setTimeout(() => {
        containerRef.current.scrollTo({
          top: scrollStop,
          left: 0,
          behavior: "smooth",
        });
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

  // follow store
  const followStore = async () => {
    await axios.post("/api/store/follow-store", {
      followerId: user._id,
      userStoreId: storeUser._id,
    });
    setStoreDataTrigger(!storeDataTrigger);
  };

  // unfollow store
  const unfollowStore = async () => {
    await axios.post("/api/store/unfollow-store", {
      unfollowerId: user._id,
      userStoreId: storeUser._id,
    });
    setStoreDataTrigger(!storeDataTrigger);
  };

  return (
    <>
      <main className="w-[100%]  h-full  relative  ">
        {isFetching && (
          <div className="flex items-center justify-center absolute top-0 left-0 w-full h-full z-50 bg-neutral-800">
            <img src={Loader} className="h-24 w-[400px] object-cover"></img>
          </div>
        )}

        <div className="h-[50%] relative bg-cover">
          <button
            onClick={() => {
              if (isFollowing) {
                unfollowStore();
              } else {
                followStore();
              }
            }}
            className="w-[6%] h-[10%] bg-transparent absolute top-2 left-4 flex p-4 rounded-md text-white z-50 justify-center items-center gap-1 hover:bg-orange-500 transition-all "
          >
            {isFollowing ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                />
              </svg>
            )}
            {isFollowing ? "Unfollow" : "Follow"}
          </button>
          <img
            src={storeData && storeData.storeCover}
            className=" h-full w-full object-cover"
          ></img>
          <div
            className={
              isFetching
                ? "invisible"
                : "h-full w-full bg-black bg-opacity-40 absolute top-0"
            }
          ></div>
          <div className="w-[50%] h-[35%]  z-50 absolute bottom-0 flex gap-4 p-4">
            {" "}
            <img
              src={storeData && storeData.storeProfile}
              className="h-full w-[20%]  rounded-xl shadow-xl object-cover"
            ></img>
            <div className="text-white bg-neutral-900 p-4 rounded-xl z-50 min-w-[20%] max-w-[40%] ">
              <h1 className="text-xl lg:text-3xl">
                {storeData && storeData.storeName}
              </h1>
              <h3 className="text-gray-400 text-sm lg:text-base">
                {storeData && storeData.storeAddress}
              </h3>
              <p className="text-sm lg:text-base">
                {storeData && storeData.storeDescription}
              </p>
              <div className="flex">
                <h1 className="">
                  {storeUser && storeUser.followers.length} followers
                </h1>{" "}
              </div>
            </div>
          </div>
          <div className="absolute right-0 bottom-0   h-[10%] w-[20%]">
            <button
              className={
                active === "Store"
                  ? "h-full w-[50%] bg-orange-500 rounded-l-md text-white"
                  : "h-full w-[50%] bg-neutral-900 bg-opacity-50 text-white  rounded-l-md border-2 border-opacity-50 border-orange-500 transition-all hover:border-opacity-75"
              }
              onClick={() => setActive("Store")}
            >
              Store
            </button>
            <button
              className={
                active === "Feed"
                  ? "h-full w-[50%] bg-orange-500 text-white"
                  : "h-full w-[50%] bg-neutral-900 bg-opacity-50 text-white  border-2 border-opacity-50 border-orange-500 transition-all hover:border-opacity-75"
              }
              onClick={() => setActive("Feed")}
            >
              Feed
            </button>
          </div>
        </div>
        <div
          className="h-[50%] overflow-scroll scrollbar-hide"
          ref={containerRef}
        >
          {active === "Feed" ? (
            <StoreFeed storeUser={storeUser} />
          ) : (
            productCollections &&
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
            })
          )}
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
