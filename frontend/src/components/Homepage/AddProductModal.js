import React from "react";
import { useSelector } from "react-redux";

const AddProductModal = ({ setAddProductModalVisible, setProduct }) => {
  const products = useSelector((state) => state.userData.value.products);

  console.log(products);
  return (
    <div className="absolute top-0 h-full w-full bg-neutral-900 bg-opacity-40 z-50 flex justify-center items-center">
      <article className="lg:h-[50%] h-[80%] w-full lg:w-[50%] bg-neutral-900 fl2 relative rounded-md p-4">
        <button
          className="absolute top-2 left-2"
          onClick={() => setAddProductModalVisible(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-8 h-8 text-neutral-700 hover:text-orange-500 transition-all"
          >
            <path
              fill-rule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <div className="w-full h-[80%] flexcenter">
          <h1 className="text-white mb-2 ">
            Select your product for this post
          </h1>
          <div className="w-full h-[90%]  overflow-scroll scrollbar-hide">
            {products &&
              products.map((product, i) => {
                return (
                  <article
                    className={
                      i === 0
                        ? "w-full h-[25%] bg-neutral-800 cursor-pointer  grid grid-cols-3 hover:bg-neutral-700 transition-all rounded-r-md rounded-l-md"
                        : "w-full h-[25%] bg-neutral-800 mt-1 cursor-pointer grid grid-cols-3 hover:bg-neutral-700 transition-all  rounded-r-md rounded-l-md"
                    }
                    onClick={() => {
                      setProduct(product);
                      setAddProductModalVisible(false);
                    }}
                  >
                    <div className="overflow-hidden flex items-center justify-center border-r-2 border-neutral-900 border-opacity-20">
                      <img
                        className="h-[80%] w-[80%] object-cover rounded-md"
                        src={product.productPicture[0]}
                      ></img>
                    </div>
                    <div className="p-4  border-r-2 border-neutral-900 border-opacity-20">
                      <h1 className="text-xl text-white">
                        {product.productName}
                      </h1>
                      <h3 className="text-white text-sm">
                        {product.productDescription}
                      </h3>
                    </div>
                    <div className="flex items-center justify-center">
                      <h1 className="text-white text-3xl">
                        {product.productNewPrice}$
                      </h1>
                    </div>
                  </article>
                );
              })}
          </div>
        </div>
      </article>
    </div>
  );
};

export default AddProductModal;
