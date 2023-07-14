import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HomepageProduct = () => {
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("/api/store/most-sold-product")
      .then(({ data }) => setProduct(data));
  }, []);

  return (
    <article
      className="h-full w-full relative cursor-pointer flex justify-center items-center group"
      onClick={() =>
        navigate(`/store/${product.store[0].storeName}/product/${product._id}`)
      }
    >
      <div className="absolute top-0 left-0 h-full w-full bg-neutral-800 z-10  hover:bg-opacity-70 transition-all"></div>
      <div className="bg-gray-500 h-[60%] w-[50%] z-20 rounded-md flex group-hover:w-[55%] group-hover:h-[65%] transition-all">
        <img
          src={product && product.productPicture[0]}
          className="h-full w-[50%]  object-cover z-20 rounded-md"
        ></img>
        <div className="w-[50%] z-20 text-white p-4 relative">
          <h1 className="text-4xl">{product && product.productName}</h1>
          <h3 className="mt-1">{product && product.productDescription}</h3>
          <h3 className="bottom-4 text-6xl absolute">
            {product && product.productNewPrice}€
          </h3>
          <button className="absolute right-0 bottom-4 bg-orange-500 p-6 rounded-l-md text-xl hover:text-gray-800  transition-all">
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
};

export default HomepageProduct;
