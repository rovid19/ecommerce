import React, { useState } from "react";
import Img from "../../../../assets/user.png";
import axios from "axios";
import StoreProductCard from "../../Store/StoreProductCard";
import { useSelector } from "react-redux";

const StoreEdit = () => {
  const [name, setName] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [address, setAddress] = useState(null);
  const [description, setDescription] = useState(null);
  const user = useSelector((state) => state.user.value);
  const styles = {
    backgroundImage: user.store && `url(${user.store.storeCover})`,
  };

  console.log(name, address, description);

  function handlePhotoUpload(e) {
    const file = e.target.files;
    const formData = new formData();
    formData.append("photo", file[0]);

    axios
      .post("/api/store/upload-profileImage-store", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(({ data }) => {
        setProfilePhoto(data);
      });
  }

  return (
    <div className="absolute left-[15%] store w-full h-full top-0">
      <button className="absolute z-10 right-2 top-2 w-[100px] h-[50px] bg-orange p-2 text-white rounded-xl  hover:scale-105">
        Save
      </button>{" "}
      <div className="h-[35%] relative bg-cover " style={styles}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-10 h-10 absolute top-2 left-2 cursor-pointer hover:scale-105 hover:text-orange z-10"
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
                placeholder="Store name"
                className="bg-transparent text-white"
                defaultValue={user.store && user.store.storeName}
                onChange={(e) => setName(e.target.value)}
              />
            </h1>
            <h3 className="text-gray-400 text-sm lg:text-base">
              <input
                placeholder="Store address"
                className="bg-transparent text-white"
                defaultValue={user.store && user.store.storeAddress}
                onChange={(e) => setAddress(e.target.value)}
              />
            </h3>
            <p className="text-sm lg:text-base">
              <input
                placeholder="Store description"
                className="bg-transparent text-white"
                defaultValue={user.store && user.store.storeDescription}
                onChange={(e) => setDescription(e.target.value)}
              />
            </p>{" "}
          </div>
        </div>
        <div className="relative bg-black w-[20%] ">
          <img
            src={user.store && user.store.storeProfile}
            className="h-28 absolute bottom-4 left-2 lg:h-36 lg:left-4  border-2 border-black rounded-full"
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
