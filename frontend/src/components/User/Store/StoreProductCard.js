import React, { useState, useEffect } from "react";
import Img from "../../../assets/testslika.png";
import axios from "axios";

const StoreProductCard = () => {
  const [storeProducts, setStoreProducts] = useState(null);
  const styles = {
    backgroundImage: `url(${Img})`,
  };
  useEffect(() => {
    axios.get("/api/store/get-store-products").then(({ data }) => {
      setStoreProducts(data);
    });
  }, []);

  console.log(storeProducts);
  return (
    <div className="h-[280px] mt-1 ml-2 mr-2 mb-1 bg-white rounded-xl shadow-md cursor-pointer hover:scale-105 transition-all relative">
      <div className="h-[60%] rounded-t-xl w-full bg-black overflow-hidden">
        <img src={Img} className="h-[100%] w-[100%] object-cover"></img>
      </div>
      <div className="h-[40%] w-full pt-2 pl-2 ">
        <h1 className="font-bold text-xl">1950$</h1>
        <p className="text-sm">Jordan 4 retro color</p>
        <div className=" w-full h-[45px] absolute bottom-0 left-0 rounded-b-xl flex items-center pt-2 lg:pt-0 md:bottom-1 lg:bottom-0 ">
          <div className="h-[60%] w-[40%] md:w-[30%] lg:w-[25%] bg-yellow-300 rounded-2xl ml-2 flex items-center p-2 md:p-4  lg:p-2 text-sm text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-6 h-6 "
            >
              <path
                fill-rule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clip-rule="evenodd"
              />
            </svg>
            4.8
          </div>
          <div className=" h-[60%] w-[10px] border-r-2 border-gray-300"></div>
          <h2 className="ml-2 text-[12px] md:text-sm"> 120 sold</h2>
          <div className="hidden lg:block h-[60%] w-[10px] border-r-2 border-gray-300"></div>
          <button className="hidden ml-2 bg-orange p-2 h-[60%] lg:flex items-center text-white rounded-xl text-sm  hover:border-2 hover:border-orange hover:text-black">
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoreProductCard;
