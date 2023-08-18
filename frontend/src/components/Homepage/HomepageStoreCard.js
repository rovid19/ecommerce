import React from "react";
import { useNavigate } from "react-router-dom";

const HomepageStoreCard = ({ store, index }) => {
  // OTHER
  const navigate = useNavigate();
  return (
    <article
      className="h-full w-full bg-gray-50 rounded-md shadow-lg cursor-pointer overflow-hidden relative  group"
      onClick={() =>
        navigate(`/store/${store[index].storeName}/${store[index]._id}`)
      }
    >
      <img
        src={store[index].storeCover}
        className="h-full w-full object-cover group-hover:scale-125 transition-all "
      ></img>
      <div className="absolute top-0 left-0 bg-black bg-opacity-30 h-full w-full flex items-center justify-center group">
        <h1 className="text-neutral-300 text-3xl group-hover:text-white ">
          {store[index].storeName}
        </h1>
      </div>
    </article>
  );
};

export default HomepageStoreCard;
