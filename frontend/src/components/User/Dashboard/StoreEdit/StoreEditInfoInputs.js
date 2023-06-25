import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import Loader from "../../../../assets/svg-loaders/three-dots.svg";

const StoreEditInfoInputs = ({
  setName,
  setCoverPhoto,
  setProfilePhoto,
  setAddress,
  setDescription,
  setCurrentPhoto,
  isLoading,
  currentPhoto,
  setIsLoading,
  profilePhoto,
}) => {
  // redux
  const editMode = useSelector((state) => state.editMode.value);
  const user = useSelector((state) => state.userData.value.user);

  // functions
  function handlePhotoUpload(e) {
    setIsLoading(true);
    const file = e.target.files;
    const formData = new FormData();
    formData.append("photo", file[0]);

    axios
      .post("/api/store/upload-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(({ data }) => {
        if (currentPhoto === "profile") {
          setProfilePhoto(data);
        } else {
          setCoverPhoto(data);
        }
        setIsLoading(false);
      });
  }

  return (
    <>
      {" "}
      <label>
        <input
          className="hidden"
          type="file"
          onChange={handlePhotoUpload}
          onClick={() => setCurrentPhoto("cover")}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={
            editMode
              ? "w-8 h-8 absolute bottom-4 right-4 cursor-pointer text-white shadow-xl hover:scale-105 hover:text-white rounded-md hover:bg-orange hover:border-orange z-20 border-2 border-gray-300 transition-all"
              : "hidden"
          }
        >
          <path
            fillRule="evenodd"
            d="M12 5.25a.75.75 0 01.75.75v5.25H18a.75.75 0 010 1.5h-5.25V18a.75.75 0 01-1.5 0v-5.25H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z"
            clipRule="evenodd"
          />
        </svg>
      </label>
      <div className="h-full w-[25%] md:w-[15%] lg:w-[8%] z-20 relative">
        {isLoading && currentPhoto === "profile" && (
          <div className="h-full w-full absolute top-0 left-0 flex items-center justify-center ">
            <img className="" src={Loader}></img>
          </div>
        )}
        <img
          src={profilePhoto ? profilePhoto : user.store.storeProfile}
          className={
            user.store.storeProfile
              ? "h-full w-full object-cover rounded-lg   "
              : "h-full w-full object-cover  border-2 border-gray-300 "
          }
        ></img>
        <label>
          <input
            className="hidden"
            type="file"
            onChange={handlePhotoUpload}
            onClick={() => setCurrentPhoto("profile")}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={
              editMode
                ? "w-6 h-6 absolute bottom-0 cursor-pointer text-white shadow-xl hover:scale-105 hover:text-white hover:bg-orange-500 hover:border-orange-500 z-10 border-2 rounded-md border-gray-300 transition-all"
                : "hidden"
            }
          >
            <path
              fillRule="evenodd"
              d="M12 5.25a.75.75 0 01.75.75v5.25H18a.75.75 0 010 1.5h-5.25V18a.75.75 0 01-1.5 0v-5.25H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>
      <div className="text-white h-full w-[60%] 2xl:w-[25%] ml-2 md:w-[35%] lg:w-[35%] bg-black p-4  rounded-xl z-20">
        <h1 className="text-gray-300 text-base xl:text-base">
          {editMode
            ? "Enter your store details here:"
            : "Enable Edit Mode to edit your store details "}
        </h1>
        <h1 className="text-xl lg:text-2xl 2xl:text-3xl ">
          <input
            placeholder="Store name"
            className="bg-transparent text-white"
            defaultValue={user.store && user.store.storeName}
            onChange={(e) => setName(e.target.value)}
            disabled={editMode ? false : true}
          />
        </h1>
        <h3 className="text-gray-400 text-base ">
          <input
            placeholder="Store address"
            className="bg-transparent text-white"
            defaultValue={user.store && user.store.storeAddress}
            onChange={(e) => setAddress(e.target.value)}
            disabled={editMode ? false : true}
          />
        </h3>
        <p className="text-base lg:text-sm 2xl:text-base">
          <input
            placeholder="Store description"
            className="bg-transparent text-white"
            defaultValue={user.store && user.store.storeDescription}
            onChange={(e) => setDescription(e.target.value)}
            disabled={editMode ? false : true}
          />
        </p>
      </div>
    </>
  );
};

export default StoreEditInfoInputs;
