import React from "react";
import { useNavigate } from "react-router-dom";

const HomepageStoreCard = ({ store, index }) => {
  const navigate = useNavigate();
  return (
    <article
      className="h-full w-full bg-gray-50 rounded-md shadow-lg cursor-pointer overflow-hidden relative  group"
      onClick={() =>
        navigate(`/store/${store[index].storeName}/${store[index]._id}`)
      }
    >
      {/*<div className="absolute top-0 left-0 h-[40%] w-full overflow-hidden group:">
        <img
          src={store[index].storeProfile}
          className="rounded-md h-full  w-full object-cover group-hover:scale-125 transition-all"
        ></img>
      </div>
      <div className="h-[40%] w-full"></div>
      <div className="w-full h-[30%] p-4">
        <h1 className="text-3xl uppercase ">{store[index].storeName}</h1>
        <h3 className="text-xl">{store[index].storeAddress}</h3>
        <p className="text-base">{store[index].storeDescription}</p>
      </div>
      <div className="h-[30%] flex overflow-scroll scrollbar-hide gap-2 relative">
        <div className="bg-black bg-opacity-50 absolute top-0 left-0 h-full w-full flex justify-center items-center">
          <h1 className="text-white text-2xl">Store products</h1>
        </div>
        {store &&
          store[index].storeProducts.map((product) => {
            return (
              <img
                src={product.productPicture[0]}
                className="w-[33%] object-cover rounded-md"
              ></img>
            );
          })}
        </div>*/}
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
