import React, { useState } from "react";
import axios from "axios";
import StoreProductCard from "../../Store/StoreProductCard";
import { useDispatch, useSelector } from "react-redux";
import { switchValue } from "../../../../app/features/getUserTrigger";
import Loader from "../../../../assets/svg-loaders/three-dots.svg";
import StoreSavedModal from "./StoreSavedModal";
import StoreDeleteProductModal from "./StoreDeleteProductModal.js";

const StoreEdit = () => {
  const [name, setName] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [address, setAddress] = useState(null);
  const [description, setDescription] = useState(null);
  const [currentPhoto, setCurrentPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const user = useSelector((state) => state.user.value);
  const getUserTrigger = useSelector((state) => state.getUserTrigger.value);
  const storeSubPage = useSelector((state) => state.storeSubPage.value);
  const storeProducts = useSelector((state) => state.storeProducts.value);
  const isStoreDeleteVisible = useSelector(
    (state) => state.isStoreDeleteVisible.value
  );
  const isUserFetching = useSelector((state) => state.isUserFetching.value);

  const dispatch = useDispatch();
  const styles = {
    backgroundImage: coverPhoto
      ? `url(${coverPhoto})`
      : `url(${user.store.storeCover})`,
  };

  function handlePhotoUpload(e) {
    setIsLoading(true);
    const file = e.target.files;
    const formData = new FormData();
    formData.append("photo", file[0]);
    console.log(file[0]);

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

  function handleSaveStore() {
    setIsLoading(true);
    axios
      .put("/api/store/edit-store", {
        name: name ? name : user.store.storeName,
        profilePhoto: profilePhoto ? profilePhoto : user.store.storeProfile,
        coverPhoto: coverPhoto ? coverPhoto : user.store.storeCover,
        address: address ? address : user.store.storeAddress,
        description: description ? description : user.store.storeDescription,
      })
      .then(() => {
        dispatch(switchValue(!getUserTrigger));
        setIsVisible(!isVisible);
        setIsLoading(false);
      });
  }
  console.log(isUserFetching);
  return (
    <div
      className={
        storeSubPage === "editStore"
          ? "absolute left-[15%] store w-full h-full top-0"
          : "hidden"
      }
    >
      {isStoreDeleteVisible && <StoreDeleteProductModal />}
      {isVisible && <StoreSavedModal setIsVisible={setIsVisible} />}
      {isVisible ? (
        ""
      ) : (
        <button
          onClick={() => {
            setCurrentPhoto("save");
            handleSaveStore();
          }}
          className="absolute z-10 right-4 top-4 w-[100px] h-[50px] bg-orange  text-white rounded-xl hover:scale-95 shadow-xl transition-all flex items-center justify-center"
        >
          {!isLoading && "Save"}
          {isLoading && currentPhoto === "save" && (
            <img src={Loader}></img>
          )}{" "}
        </button>
      )}
      <div className="h-[35%] relative bg-cover " style={styles}>
        {isLoading && currentPhoto === "cover" && (
          <div className="h-full w-full flex justify-center items-center absolute top-0 left-0">
            {" "}
            <img src={Loader}></img>
          </div>
        )}
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
            class="w-8 h-8 absolute top-4 left-4 cursor-pointer text-white shadow-xl hover:scale-105 hover:text-white rounded-md hover:bg-orange hover:border-orange z-10 border-2 border-gray-300 transition-all"
          >
            <path
              fill-rule="evenodd"
              d="M12 5.25a.75.75 0 01.75.75v5.25H18a.75.75 0 010 1.5h-5.25V18a.75.75 0 01-1.5 0v-5.25H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z"
              clip-rule="evenodd"
            />
          </svg>
        </label>
        <div className="h-full w-full bg-black bg-opacity-50">
          <div className="text-white absolute bottom-[20px] left-[130px] lg:left-[180px] lg:bottom-[20px] bg-black p-4 rounded-xl">
            <h1 className="text-gray-300">Enter your store details here:</h1>
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
        <div className="h-28 w-[9%] absolute bottom-4 left-2 lg:h-36 lg:left-4">
          {isLoading && currentPhoto === "profile" && (
            <div className="h-full w-full absolute top-0 left-0 flex items-center justify-center ">
              {" "}
              <img className="" src={Loader}></img>{" "}
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
              class="w-6 h-6 absolute bottom-1 left-1 cursor-pointer text-white shadow-xl hover:scale-105 hover:text-white hover:bg-orange hover:border-orange z-10 border-2 rounded-md border-gray-300 transition-all"
            >
              <path
                fill-rule="evenodd"
                d="M12 5.25a.75.75 0 01.75.75v5.25H18a.75.75 0 010 1.5h-5.25V18a.75.75 0 01-1.5 0v-5.25H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z"
                clip-rule="evenodd"
              />
            </svg>
          </label>
        </div>
      </div>
      <div className="h-[65%] w-full grid grid-cols-3 2xl:grid-cols-6 p-2 overflow-scroll ">
        {storeProducts &&
          storeProducts.map((item) => {
            return <StoreProductCard storeProducts={item} />;
          })}
      </div>
    </div>
  );
};

export default StoreEdit;
