import React from "react";
import StoreEditInfoInputs from "./StoreEditInfoInputs";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../../../assets/svg-loaders/three-dots.svg";
import { setEditMode } from "../../../../app/features/Store/storeEditMode";

const StoreEditInfo = ({
  setName,
  setCoverPhoto,
  setProfilePhoto,
  setAddress,
  setDescription,
  setCurrentPhoto,
  coverPhoto,
  isLoading,
  currentPhoto,
  setIsLoading,
  profilePhoto,
}) => {
  const user = useSelector((state) => state.user.value);
  // object used for setting store cover photo
  const styles = {
    backgroundImage: coverPhoto
      ? `url(${coverPhoto})`
      : `url(${user.store.storeCover})`,
  };
  const editMode = useSelector((state) => state.editMode.value);

  const dispatch = useDispatch();
  return (
    <div
      className={
        editMode
          ? "h-[35%] relative bg-cover border-8 border-orange-500 transition-all"
          : "h-[35%] relative bg-cover transition-all"
      }
      style={styles}
    >
      <div className=" h-[50px] w-[250px]  flex items-center justify-center absolute top-0 left-2 z-40 text-white">
        <label className="switch transition-all  ">
          <input
            type="checkbox"
            className="hidden"
            onChange={() => {
              dispatch(setEditMode(!editMode));
            }}
          />
          <span className={editMode ? "sliderOrange" : "slider"}></span>
        </label>
        <h1 className={editMode ? "mr-2 text-white " : "mr-2 "}>
          {editMode ? "Disable" : "Enable "} Edit Mode
        </h1>
      </div>
      {isLoading && currentPhoto === "cover" && (
        <div className="h-full w-full flex justify-center items-center absolute top-0 left-0">
          {" "}
          <img src={Loader}></img>
        </div>
      )}
      <StoreEditInfoInputs
        setName={setName}
        setCoverPhoto={setCoverPhoto}
        setProfilePhoto={setProfilePhoto}
        setAddress={setAddress}
        setDescription={setDescription}
        setCurrentPhoto={setCurrentPhoto}
        isLoading={isLoading}
        currentPhoto={currentPhoto}
        setIsLoading={setIsLoading}
        profilePhoto={profilePhoto}
      />
    </div>
  );
};

export default StoreEditInfo;
