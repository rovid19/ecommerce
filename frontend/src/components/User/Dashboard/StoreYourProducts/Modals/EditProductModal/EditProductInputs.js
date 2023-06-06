import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { switchValue } from "../../../../../../app/features/getUserTrigger";
import { setUserFetching } from "../../../../../../app/features/User/isUserFetching";
import { setEditProductModal } from "../../../../../../app/features/Store/Dashboard/editProductModal";
import Loader from "../../../../../../assets/svg-loaders/three-dots.svg";
import { useEffect, useState } from "react";
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
  //states
  const [index, setIndex] = useState();
  const [picFetch, setPicFetch] = useState(false);
  //redux
  const getUserTrigger = useSelector((state) => state.getUserTrigger.value);

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
    if (productPicture.length < 6) {
      setPicFetch(true);
      const file = e.target.files;
      console.log(file);
      const formData = new FormData();
      formData.append("photo", file[0]);

      console.log(formData);

      axios
        .post("/api/store/upload-image", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then(({ data }) => {
          let newArray = productPicture;
          newArray.push(data);
          setProductPicture(newArray);
          setPicFetch(false);
        });
    } else {
      alert("you can only upload 6 pictures");
    }
  }

  useEffect(() => {
    if (index !== null && index !== undefined) {
      const newArray = productPicture;
      newArray.splice(index, 1);
      setProductPicture(newArray);
      setIndex(null);
      console.log(newArray);
    }
  }, [index]);

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
          {picFetch ? (
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
              {productPicture.length > 0 ? (
                <>
                  {productPicture.map((item, index) => {
                    if (index === 0) {
                      return (
                        <div className="relative h-full w-full group ">
                          {productPicture.length < 6 && (
                            <div className="absolute h-full w-full flex items-center justify-center bg-black bg-opacity-20 text-white group">
                              {" "}
                              <h1 className="group-hover:text-2xl transition-all">
                                {" "}
                                Add more{" "}
                              </h1>
                            </div>
                          )}

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            class="w-10 h-10 text-white hover:scale-90 absolute bg-orange-500 top-0 p-1 right-0 invisible group-hover:visible "
                            onClick={(e) => {
                              e.stopPropagation();
                              setIndex(index);
                            }}
                          >
                            <path
                              fill-rule="evenodd"
                              d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                              clip-rule="evenodd"
                            />
                          </svg>
                          <img
                            src={item}
                            className="w-full h-full object-cover"
                          ></img>
                        </div>
                      );
                    }
                  })}
                  <div className="absolute w-full h-[30%] flex bottom-0 z-50 group">
                    {productPicture.map((item, index) => {
                      if (index > 0) {
                        return (
                          <div className="relative w-[20%] h-full">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="w-7 h-7 text-white hover:scale-90 absolute bg-orange-500 bottom-0 p-1 left-0 invisible group-hover:visible"
                              onClick={(e) => {
                                setIndex(index);
                              }}
                            >
                              <path
                                fill-rule="evenodd"
                                d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                                clip-rule="evenodd"
                              />
                            </svg>
                            <img
                              src={item}
                              className="w-full h-full object-cover rounded-md"
                            ></img>{" "}
                          </div>
                        );
                      }
                    })}
                  </div>
                  ;
                </>
              ) : (
                <h1 className="text-3xl text-gray-300 group-hover:text-gray-500">
                  Insert Product Picture Here
                </h1>
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
