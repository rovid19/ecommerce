import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { switchValue } from "../../../../../../app/features/getUserTrigger";
import { setUserFetching } from "../../../../../../app/features/User/isUserFetching";
import { setEditProductModal } from "../../../../../../app/features/Store/Dashboard/editProductModal";
import Loader from "../../../../../../assets/svg-loaders/three-dots.svg";

const EditProductInputs = ({
  setProductPicture,
  setProductTitle,
  setProductDescription,
  setProductPrice,
  productPrice,
  productPicture,
  productTitle,
  productDescription,
  setIsFetching,
  currentProduct,
}) => {
  //redux
  const getUserTrigger = useSelector((state) => state.getUserTrigger.value);
  const isUserFetching = useSelector((state) => state.isUserFetching.value);
  const selectedProduct = useSelector((state) => state.selectedProduct.value);
  const dispatch = useDispatch();

  //functions
  function handleEditProduct(e) {
    setIsFetching(true);
    e.preventDefault();
    axios
      .put("/api/store/edit-product", {
        selectedProduct,
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
        dispatch(setEditProductModal(false));
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
    <form onSubmit={handleEditProduct} className="h-[95%]">
      <div className="h-[60%] rounded-lg w-full overflow-hidden">
        <label
          className={
            productPicture
              ? "h-full  flex items-center justify-center  bg-opacity-30 z-20 cursor-pointer group overflow-hidden relative"
              : "h-full flex items-center justify-center border-b-2 border-t-2 border-gray-300 border-opacity-10 cursor-pointer group  relative"
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
                <img
                  src={currentProduct && currentProduct.productPicture}
                  className="w-full h-full object-cover"
                />
              )}
            </>
          )}
        </label>
      </div>
      <div className="h-[40%] w-full pt-2 pl-2  ">
        <input
          type="text"
          className="text-3xl w-full border-b-2 border-gray-300 border-opacity-10 p-2"
          placeholder="Name of your product"
          onChange={(e) => setProductTitle(e.target.value)}
          defaultValue={currentProduct && currentProduct.productName}
        />
        <input
          type="text"
          className="text-xl w-full border-b-2 border-gray-300 border-opacity-10 p-2"
          placeholder="Description of your product"
          onChange={(e) => setProductDescription(e.target.value)}
          defaultValue={currentProduct && currentProduct.productDescription}
        />{" "}
        <div className="relative bg-black">
          <input
            type="text"
            className="text-xl  w-full border-b-2 border-gray-300 border-opacity-10 p-2"
            placeholder="Price of your product"
            onChange={(e) => setProductPrice(e.target.value)}
            defaultValue={currentProduct && currentProduct.productNewPrice}
          />
        </div>
        <button className="bg-orange-500 text-white rounded-md w-[20%] h-[40px] hover:w-[30%] transition-all mt-6">
          Save
        </button>
      </div>
    </form>
  );
};

export default EditProductInputs;