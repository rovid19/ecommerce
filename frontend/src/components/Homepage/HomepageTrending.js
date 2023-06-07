import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrendingStore } from "../../app/features/User/trendingStore";
import { useNavigate } from "react-router-dom";

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
      className="h-full w-full relative cursor-pointer flex justify-center items-center group"
      onClick={() =>
        navigate(`/store/${trendingStore.storeName}/${trendingStore._id}`)
      }
    >
      <img
        src={trendingStore && trendingStore.storeCover}
        className="absolute top-0 left-0 h-full w-full object-cover"
      />
      <div className="absolute top-0 left-0 h-full w-full bg-black z-10 bg-opacity-60 hover:bg-opacity-70 transition-all"></div>
      <div className="bg-black h-[60%] w-[50%] z-20 rounded-md flex group-hover:w-[55%] group-hover:h-[65%] transition-all">
        <img
          src={trendingStore && trendingStore.storeProfile}
          className="h-full w-[50%]  object-cover z-20 rounded-md"
        ></img>
        <div className="w-[50%] z-20 text-white p-4">
          <h1 className="text-4xl">
            {trendingStore && trendingStore.storeName}
          </h1>
          <h3>{trendingStore && trendingStore.storeAddress}</h3>
          <h3>{trendingStore && trendingStore.storeDescription}</h3>
        </div>
      </div>
    </article>
  );
};

export default HomepageTrending;
