import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrendingStore } from "../../app/features/User/trendingStore";
import { useNavigate } from "react-router-dom";
import StoreProductCard from "../User/Store/StoreProductCard";

const HomepageTrending = () => {
  const trendingStore = useSelector((state) => state.trendingStore.store);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTrendingStore());
  }, []);

  console.log(trendingStore);
  return (
    <article
      className="h-full w-full relative cursor-pointer group flex"
      onClick={() =>
        navigate(`/store/${trendingStore.storeName}/${trendingStore._id}`)
      }
    >
      <div className="h-full w-full overflow-hidden absolute top-0 left-0">
        <img
          src={trendingStore && trendingStore.storeCover}
          className=" h-full w-full object-cover group-hover:scale-125 transition-all"
        />
      </div>
      <div className="absolute top-0 left-0 h-full w-full bg-black z-10 bg-opacity-40 transition-all"></div>
      <div className="h-[60%] w-[30%] z-20 rounded-md flex  transition-all p-2">
        <img
          src={trendingStore && trendingStore.storeProfile}
          className="h-[200px] w-[200px]  object-cover z-20 rounded-md"
        ></img>
        <div className="flex-grow h-[200px] z-20 text-white p-4 bg-neutral-900  rounded-r-md overflow-hidden">
          <h1 className="text-4xl">
            {trendingStore && trendingStore.storeName}
          </h1>
          <h3>{trendingStore && trendingStore.storeAddress}</h3>
          <h3>{trendingStore && trendingStore.storeDescription}</h3>
        </div>
      </div>
      <div className="h-full w-[70%] z-40 absolute right-0 flex items-center justify-center bg-neutral-900 bg-opacity-50 rounded-l-md p-4">
        {Object.keys(trendingStore).length > 0 &&
          trendingStore.storeCollections.map((collection, i) => {
            if (i === 0) {
              return (
                <article className="h-[90%] w-full relative fl overflow-x-auto scrollbar-hide">
                  <div className="h-[10%]"></div>
                  <div className="h-[90%] flex items-center  gap-4 min-w-min relative">
                    <div className="h-[12%] bg-neutral-900 w-full absolute top-[-11%] left-0 p-2 rounded-md">
                      <h1 className="text-neutral-300">
                        {collection.collectionName}
                      </h1>
                    </div>
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
