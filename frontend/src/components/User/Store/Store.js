import React from "react";
import Img from "../../../assets/user.png";
import Img1 from "../../../assets/test.jpg";
import StoreProductCard from "../Store/StoreProductCard.js";
import { useSelector } from "react-redux";

const Store = () => {
  const user = useSelector((state) => state.user.value);
  const styles = {
    backgroundImage: user.store.storeCover && `url(${user.store.storeCover})`,
  };
  console.log(Object.keys(user.store.storeProducts));
  return (
    <div className="w-[100%] bg-gray-50 skrin flex justify-center">
      <div className=" w-[100%] lg:w-[85%]">
        <div className="h-[35%] relative bg-cover" style={styles}>
          <div className="h-full w-full bg-black bg-opacity-20">
            <div className="text-white absolute bottom-[20px] left-[130px] lg:left-[180px] lg:bottom-[40px] bg-black p-4 rounded-xl">
              <h1 className="text-xl lg:text-3xl">{user && user.storeName}</h1>
              <h3 className="text-gray-400 text-sm lg:text-base">
                Lug Zabocki 71f, Zabok
              </h3>
              <p className="text-sm lg:text-base">
                {user && user.store.storeDescription}
              </p>{" "}
            </div>
          </div>
          <img
            src={user && user.store.storeProfile}
            className="h-28 absolute bottom-4 left-2 lg:h-36 lg:left-4"
          ></img>
        </div>
        <div className="h-[65%] grid grid-cols-3 2xl:grid-cols-6">
          {user &&
            Object.keys(user.store.storeProducts).map((item) => {
              return <StoreProductCard />;
            })}
        </div>
      </div>
    </div>
  );
};

export default Store;
