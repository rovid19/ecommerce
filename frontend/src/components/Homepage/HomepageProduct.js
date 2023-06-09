import React, { useEffect, useState } from "react";
import axios from "axios";

const HomepageProduct = () => {
  const [product, setProduct] = useState(null);
  useEffect(() => {
    axios
      .get("/api/store/most-sold-product")
      .then(({ data }) => setProduct(data));
  }, []);
  console.log(product);
  return (
    <article className="h-full w-full relative cursor-pointer flex justify-center items-center group">
      <div className="absolute top-0 left-0 h-full w-full bg-black z-10 bg-opacity-40 hover:bg-opacity-70 transition-all"></div>
      <div className="bg-black h-[60%] w-[50%] z-20 rounded-md flex group-hover:w-[55%] group-hover:h-[65%] transition-all">
        <img
          src={product && product.productPicture[0]}
          className="h-full w-[50%]  object-cover z-20 rounded-md"
        ></img>
        <div className="w-[50%] z-20 text-white p-4">
          <h1 className="text-4xl">{product && product.productName}</h1>
          <h3>{product && product.productDescription}</h3>
          <h3>{product && product.newPrice}</h3>
        </div>
      </div>
    </article>
  );
};

export default HomepageProduct;
