import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { switchValue } from "../../../../app/features/getUserTrigger";
import Loader from "../../../../assets/svg-loaders/three-dots.svg";
import { setUserFetching } from "../../../../app/features/User/isUserFetching";

const StoreAddProductModal = ({ setIsVisible }) => {
  const [productPicture, setProductPicture] = useState(undefined);
  const [productTitle, setProductTitle] = useState(null);
  const [productDescription, setProductDescription] = useState(null);
  const [productPrice, setProductPrice] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const getUserTrigger = useSelector((state) => state.getUserTrigger.value);
  const isUserFetching = useSelector((state) => state.isUserFetching.value);
  const dispatch = useDispatch();

  function handleAddProduct(e) {
    setIsFetching(true);
    e.preventDefault();
    axios
      .post("/api/store/add-product", {
        productPicture,
        productTitle,
        productDescription,
        productPrice,
      })
      .then(() => {
        dispatch(switchValue(!getUserTrigger));
      })
      .then(() => {
        setIsFetching(false);
        setIsVisible(false);
      });
  }

  function handleUploadProductPicture(e) {
    dispatch(setUserFetching(true));
    const file = e.target.files;
    const formData = new FormData();
    formData.append("photo", file[0]);

    axios
      .post("/api/store/upload-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(({ data }) => {
        setProductPicture(data);
        dispatch(setUserFetching(false));
      });
  }

  return (
    <div className="w-full h-full flex items-center justify-center bg-black bg-opacity-40 z-20 absolute top-0 left-0">
      {isFetching && (
        <div className="w-full h-full absolute top-0 bg-black bg-opacity-50 left-0 flex items-center justify-center z-40">
          <img src={Loader}></img>
        </div>
      )}
      <div className="w-[35%] h-[70%] bg-white p-2 rounded-lg relative ">
        <button onClick={() => setIsVisible(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6 bg-orange rounded-sm text-white hover:scale-90 transition-all "
          >
            <path
              fill-rule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <form onSubmit={handleAddProduct} className="h-[60%]">
          <div className="h-full rounded-lg w-full overflow-hidden">
            <label
              className={
                productPicture
                  ? "h-full  flex items-center justify-center  bg-opacity-30 z-20 cursor-pointer group overflow-hidden relative"
                  : "h-full flex items-center justify-center border-2 border-gray-300 border-opacity-20 cursor-pointer group  relative"
              }
            >
              {isUserFetching ? (
                <div className="h-full w-full absolute top-0 left-0 bg-black bg-opacity-0 flex items-center justify-center">
                  <img src={Loader} />
                </div>
              ) : (
                <>
                  <input
                    onChange={handleUploadProductPicture}
                    type="file"
                    className="hidden"
                  />
                  {productPicture ? (
                    <img
                      src={productPicture}
                      className="w-full h-full object-cover"
                    ></img>
                  ) : (
                    <h1 className="text-3xl text-gray-300 group-hover:text-gray-500">
                      Insert Product Picture Here
                    </h1>
                  )}
                </>
              )}
            </label>
          </div>
          <div className="h-[30%] w-full pt-2 pl-2 ">
            <input
              type="text"
              className="text-3xl w-full "
              placeholder="Name of your product"
              onChange={(e) => setProductTitle(e.target.value)}
            />
            <input
              type="text"
              className="text-2xl w-full "
              placeholder="Description of your product"
              onChange={(e) => setProductDescription(e.target.value)}
            />{" "}
            <input
              type="text"
              className="text-2xl  w-full"
              placeholder="Price of your product"
              onChange={(e) => setProductPrice(e.target.value)}
            />
          </div>

          <button className="bg-orange text-white rounded-md w-[20%] h-[40px] hover:scale-95 transition-all">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default StoreAddProductModal;
