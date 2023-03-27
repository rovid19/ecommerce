import React from "react";

const StoreSavedModal = ({ setIsVisible }) => {
  return (
    <div
      className="w-full h-full  flex items-center justify-center bg-black bg-opacity-40 z-30 absolute top-0 left-0 cursor-pointer"
      onClick={() => setIsVisible(false)}
    >
      <div className="w-[30%] h-[20%] fl2 bg-orange-500 rounded-xl text-white">
        <h1 className="text-2xl">Changes saved succesfully!</h1>{" "}
        <p className="text-gray-300">press anywhere to continue</p>
      </div>
    </div>
  );
};

export default StoreSavedModal;
