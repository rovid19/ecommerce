import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEditMode } from "../../../../../app/features/Store/storeEditMode";
import { setUserProfileSavedModal } from "../../../../../app/features/User/profileSavedModal";

const StoreSavedModal = ({ setIsVisible }) => {
  const htmlElement = useSelector((state) => state.htmlElement.value);
  const profileSavedModal = useSelector(
    (state) => state.profileSavedModal.value
  );

  function handleDisableEditModeToggle() {
    htmlElement.checked = false;
  }
  const dispatch = useDispatch();
  return (
    <div
      className="w-full h-full  flex items-center justify-center bg-black bg-opacity-40 z-50 absolute top-0 left-0 cursor-pointer"
      onClick={() => {
        setIsVisible(false);
        dispatch(setEditMode(false));
        dispatch(setUserProfileSavedModal(false));
        handleDisableEditModeToggle();
      }}
    >
      <div
        className="w-[80%]
h-[25%] lg:w-[30%] lg:h-[20%] fl2 bg-orange-500 rounded-xl text-white"
      >
        <h1 className="text-2xl">Changes saved succesfully!</h1>{" "}
        <p className="text-gray-300">press anywhere to continue</p>
      </div>
    </div>
  );
};

export default StoreSavedModal;
