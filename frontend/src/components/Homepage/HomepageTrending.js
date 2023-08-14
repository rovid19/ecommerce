import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrendingStore } from "../../app/features/User/trendingStore";
import { useNavigate } from "react-router-dom";
import StoreProductCard from "../User/Store/StoreProductCard";

const HomepageTrending = () => {
  const trendingStore = useSelector((state) => state.trendingStore.store);
  const mobileActive = useSelector(
    (state) => state.triggeri.value.mobileActive
  );
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTrendingStore());
  }, []);

  return (
    <article
      className="h-full w-full relative cursor-pointer fl3 lg:flex"
      onClick={() =>
        navigate(`/store/${trendingStore.storeName}/${trendingStore._id}`)
      }
    >
      <div className="h-full w-full overflow-hidden absolute top-0 left-0">
        <img
          src={trendingStore && trendingStore.storeCover}
          className=" h-full w-full object-cover hover:scale-125 transition-all"
        />
      </div>
      <div className="absolute top-0 left-0 h-full w-full bg-black z-10 bg-opacity-40 transition-all"></div>
      <div className="h-[40%] lg:h-full w-full lg:w-[50%] xl:w-[40%] 2xl:w-[30%] z-20 rounded-md flex  transition-all p-2 items-center">
        <img
          src={trendingStore && trendingStore.storeProfile}
          className="h-[150px] w-[100px] lg:h-[200px] lg:w-[200px]  object-cover z-20 rounded-md"
        ></img>
        <div className="w-full lg:flex-grow h-[150px] lg:h-[200px] z-20 text-white p-4 bg-neutral-900  rounded-r-md overflow-hidden">
          <h1 className="text-4xl">
            {trendingStore && trendingStore.storeName}
          </h1>
          <h3>{trendingStore && trendingStore.storeAddress}</h3>
          <h3>{trendingStore && trendingStore.storeDescription}</h3>
        </div>
      </div>
      <div
        className={
          mobileActive
            ? "hidden"
            : "h-[60%] lg:h-full lg:w-[50%] xl:w-[60%] 2xl:w-[70%] z-40  lg:absolute lg:right-0 flex items-center justify-center bg-neutral-900 bg-opacity-50 rounded-l-md p-4 overflow-x-auto "
        }
      >
        {!mobileActive &&
          Object.keys(trendingStore).length > 0 &&
          trendingStore.storeCollections.map((collection, i) => {
            if (i === 0) {
              return (
                <article className="h-full lg:h-[90%] w-full relative fl overflow-x-auto scrollbar-hide">
                  <div className="h-full lg:h-[90%] flex items-center  gap-4 min-w-min relative">
                    {collection.collectionProducts.map((product) => {
                      return (
                        <article className="h-[90%] w-[250px] ">
                          <StoreProductCard storeProducts={product} />
                        </article>
                      );
                    })}
                  </div>
                </article>
              );
            }
          })}
      </div>
    </article>
  );
};

export default HomepageTrending;
