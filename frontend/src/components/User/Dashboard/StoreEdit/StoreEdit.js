import React from "react";
import Img from "../../../../assets/user.png";
import Img1 from "../../../../assets/test.jpg";
import StoreProductCard from "../../Store/StoreProductCard";
import { useSelector } from "react-redux";

const StoreEdit = () => {
  const user = useSelector((state) => state.user.value);
  const styles = {
    backgroundImage: user.store.storeCover && `url(${user.store.storeCover})`,
  };

  return (
    <div className="absolute left-[15%] store w-full h-full top-0">
      {" "}
      <div className="h-[35%] relative bg-cover " style={styles}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-10 h-10 absolute top-2 left-2 cursor-pointer hover:scale-105 hover:text-orange"
        >
          <path
            fill-rule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
            clip-rule="evenodd"
          />
        </svg>
        <div className="h-full w-full bg-black bg-opacity-20">
          <div className="text-white absolute bottom-[20px] left-[130px] lg:left-[180px] lg:bottom-[40px] bg-black p-4 rounded-xl">
            <h1 className="text-xl lg:text-3xl">
              <input
                className="bg-transparent text-white"
                value={user.store.storeName && user.store.storeName}
              />
            </h1>
            <h3 className="text-gray-400 text-sm lg:text-base">
              <input
                className="bg-transparent text-white"
                value={user.store.storeAddress && user.store.storeAddress}
              />
            </h3>
            <p className="text-sm lg:text-base">
              <input
                className="bg-transparent text-white"
                value={
                  user.store.storeDescription && user.store.storeDescription
                }
              />
            </p>{" "}
          </div>
        </div>
        <div className="relative bg-black w-[20%] ">
          <img
            src={user.store.storeProfile === "" ? Img : user.store.storeProfile}
            className="h-28 absolute bottom-4 left-2 lg:h-36 lg:left-4  rounded-full"
          ></img>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-8 h-8 absolute bottom-6 left-10 cursor-pointer hover:scale-105 hover:text-orange"
          >
            <path
              fill-rule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>
      <div className="h-[65%] grid grid-cols-3 2xl:grid-cols-6">
        <StoreProductCard />
      </div>
    </div>
  );
};

export default StoreEdit;
