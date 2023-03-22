import React from "react";

const StoreSavedModal = ({ setIsVisible }) => {
  return (
    <div
      className="w-full h-full bg-transparent flex items-center justify-center z-20"
      onClick={() => setIsVisible(false)}
    >
      <div className="w-[30%] h-[30%] fl2 bg-white rounded-xl ">
        <h1 className="text-2xl">Changes saved succesfully!</h1>{" "}
        <p className="text-gray-300">press anywhere to continue</p>
      </div>
    </div>
  );
};

export default StoreSavedModal;
