import React from "react";
import Img from "../../../../assets/user.png";
import Img1 from "../../../../assets/test.jpg";
import StoreProductCard from "../../Store/StoreProductCard";

const StoreEdit = () => {
  const styles = {
    backgroundImage: `url(${Img1})`,
  };

  return (
    <div className="absolute left-[15%] w-full h-full top-0">
      {" "}
      <div className="h-[35%] relative bg-cover" style={styles}>
        <div className="h-full w-full bg-black bg-opacity-20">
          <div className="text-white absolute bottom-[20px] left-[130px] lg:left-[180px] lg:bottom-[40px] bg-black p-4 rounded-xl">
            <h1 className="text-xl lg:text-3xl">Zacov Kutak</h1>
            <h3 className="text-gray-400 text-sm lg:text-base">
              Lug Zabocki 71f, Zabok
            </h3>
            <p className="text-sm lg:text-base">
              Tvoj zac najjaci prodavac tuj 🛍️
            </p>{" "}
          </div>
        </div>
        <img
          src={Img}
          className="h-28 absolute bottom-4 left-2 lg:h-36 lg:left-4"
        ></img>
      </div>
      <div className="h-[65%] grid grid-cols-3 2xl:grid-cols-6">
        <StoreProductCard />
      </div>
    </div>
  );
};

export default StoreEdit;
