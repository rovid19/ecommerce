import React, { useEffect, useRef, useState } from "react";
import StoreProductCard from "../Store/StoreProductCard.js";
import { useDispatch, useSelector } from "react-redux";
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
  const [followHidden, setFollowHidden] = useState(false);

  // REDUX
  const user = useSelector((state) => state.userData.value.user);
  const viewProductModal = useSelector((state) => state.viewProductModal.value);
  const scrollStop = useSelector((state) => state.scrollStop.value);

  // OTHER
  const dispatch = useDispatch();
  const { storeid } = useParams();
  const containerRef = useRef(null);

  // USEEFFECT
  useEffect(() => {
    setIsFetching(true);
    axios.post("/api/store/fetch-store-data", { storeid }).then(({ data }) => {
      setStoreData(data.store);
      setProductCollections(data.user.store.storeCollections);
      setIsFetching(false);
      dispatch(setStoreId(storeid));
      dispatch(getStoreSubPage("store"));
      dispatch(setSavedStore(data.store));
      dispatch(addCollectionItems(data.store.storeCollections));
      setStoreUser(data.user);
      setTrigger(true);
    });
  }, [storeid, storeDataTrigger]);

  useEffect(() => {
    if (trigger) {
      // handleStoreCollections();
      if (storeUser.followers.includes(user && user._id)) {
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

  useEffect(() => {
    if (storeUser) {
      if (user && user._id === storeUser._id) {
        setFollowHidden(true);
      }
    }
  }, [storeUser]);

  return (
    <>
      <main className="w-[100%]  h-full  relative  ">
        {isFetching && (
          <div className="flex items-center justify-center absolute top-0 left-0 w-full h-full z-50 bg-neutral-800">
            <img src={Loader} className="h-24 w-[400px] object-cover"></img>
          </div>
        )}

        <div className="h-[50%] relative bg-cover">
          {user && Object.keys(user).length > 0 && (
            <button
              onClick={() => {
                if (isFollowing) {
                  unfollowStore();
                } else {
                  followStore();
                }
              }}
              className={
                followHidden
                  ? "hidden"
                  : "lg:w-[120px] h-[10%] bg-transparent absolute top-2 right-0 lg:left-4 flex p-4 rounded-md text-white z-40 justify-center items-center gap-1 hover:bg-orange-500 transition-all "
              }
            >
              {isFollowing ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-4 md:w-6 md:h-6"
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
          )}
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
          <div className="w-[75%] md:w-[50%] lg:h-[170px]   h-[160px] md:h-[35%]  z-40 absolute bottom-0 flex gap-2 md:gap-4 p-4">
            {" "}
            <img
              src={
                storeData && storeData.storeProfile.length > 0
                  ? storeData.storeProfile
                  : user && user.profilePicture
              }
              className="h-full w-[30%] md:w-[20%]  rounded-xl shadow-xl object-cover"
            ></img>
            <div className="text-white bg-neutral-900 p-4 rounded-xl z-50 min-w-[40%] md:min-w-[30%] max-w-full  md:max-w-full overflow-hidden">
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
          <div className="absolute right-0 bottom-0   h-[10%] w-[28%] lg:w-[20%]">
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
          className="h-[50%] w-full overflow-scroll scrollbar-hide"
          ref={containerRef}
        >
          {active === "Feed" ? (
            <StoreFeed storeUser={storeUser} />
          ) : (
            productCollections &&
            productCollections.map((item, index) => {
              return (
                <article
                  key={index}
                  className="h-full w-full relative fl overflow-x-auto "
                >
                  <div className="h-[10%]"></div>
                  <div className="h-[90%] min-w-min flex gap-2 p-2 lg:p-4 bg-neutral-800 relative">
                    <div className="h-[11%] w-full bg-neutral-900 p-4 text-neutral-300 flex items-center absolute top-[-11%] left-0">
                      <h1 className="text-xl lg:text-2xl">
                        {item.collectionName}
                      </h1>
                    </div>
                    {item &&
                      item.collectionProducts.map((product, index) => {
                        return (
                          <article
                            className="h-full w-[220px] lg:w-[250px]  flex items-center"
                            onClick={() => dispatch(addStoreProducts(product))}
                          >
                            {" "}
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
    </>
  );
};

export default Store;
